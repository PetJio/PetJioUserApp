// API Error Handler Utility
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: {
    detail?: string;
    message?: string;
    [key: string]: any;
  };
}

export interface StandardApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export class ApiErrorHandler {
  /**
   * Extract user-friendly error message from API response
   */
  static extractErrorMessage(response: ApiErrorResponse): string {
    // Priority order for error message extraction:
    // 1. error.detail (specific error details)
    // 2. error.message (error object message)
    // 3. message (general message)
    // 4. fallback based on status code
    
    if (response.error?.detail) {
      return response.error.detail;
    }
    
    if (response.error?.message) {
      return response.error.message;
    }
    
    if (response.message && response.message !== 'Failed to create data') {
      return response.message;
    }
    
    // Fallback to status code based messages
    return this.getStatusCodeMessage(response.statusCode);
  }
  
  /**
   * Get user-friendly message based on HTTP status code
   */
  static getStatusCodeMessage(statusCode: number): string {
    switch (statusCode) {
      // 4xx Client Errors
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'Invalid credentials. Please check your email and password.';
      case 403:
        return 'Access denied. You don\'t have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This data already exists. Please use different information.';
      case 422:
        return 'Invalid data provided. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      
      // 5xx Server Errors
      case 500:
        return 'Server error occurred. Please try again later.';
      case 502:
        return 'Service temporarily unavailable. Please try again.';
      case 503:
        return 'Service unavailable. Please try again later.';
      case 504:
        return 'Request timeout. Please check your connection and try again.';
      
      // Default cases
      default:
        if (statusCode >= 400 && statusCode < 500) {
          return 'Client error occurred. Please check your request.';
        } else if (statusCode >= 500) {
          return 'Server error occurred. Please try again later.';
        } else {
          return 'An unexpected error occurred.';
        }
    }
  }
  
  /**
   * Check if error is a network/connection error
   */
  static isNetworkError(error: any): boolean {
    return (
      error.message?.includes('Network request failed') ||
      error.message?.includes('Failed to fetch') ||
      error.code === 'NETWORK_ERROR' ||
      error.name === 'NetworkError' ||
      !navigator.onLine
    );
  }
  
  /**
   * Check if error is a timeout error
   */
  static isTimeoutError(error: any): boolean {
    return (
      error.name === 'AbortError' ||
      error.code === 'TIMEOUT' ||
      error.message?.includes('timeout')
    );
  }
  
  /**
   * Process API response and return standardized format
   */
  static async processApiResponse<T = any>(
    response: Response
  ): Promise<StandardApiResponse<T>> {
    let responseData: ApiErrorResponse;
    
    try {
      responseData = await response.json();
    } catch (jsonError) {
      // If JSON parsing fails, create a fallback error response
      responseData = {
        statusCode: response.status,
        message: response.statusText || 'Unknown error',
      };
    }
    
    if (response.ok) {
      // Success response
      return {
        success: true,
        message: responseData.message || 'Operation successful',
        data: responseData as T,
      };
    } else {
      // Error response
      const errorMessage = this.extractErrorMessage(responseData);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    }
  }

  /**
   * Process API response with pre-parsed data
   */
  static async processApiResponseWithData<T = any>(
    response: Response,
    responseData: any
  ): Promise<StandardApiResponse<T>> {
    if (response.ok) {
      // Success response
      return {
        success: true,
        message: responseData.message || 'Operation successful',
        data: responseData as T,
      };
    } else {
      // Error response
      const errorMessage = this.extractErrorMessage(responseData);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    }
  }
  
  /**
   * Enhanced fetch with proper error handling
   */
  static async fetchWithErrorHandling<T = any>(
    url: string,
    options: RequestInit = {}
  ): Promise<StandardApiResponse<T>> {
    const startTime = Date.now();
    const method = options.method || 'GET';
    
    console.log(`🚀 [API ${method}] ${url}`, {
      headers: options.headers,
      body: options.body ? JSON.parse(options.body as string) : undefined,
    });
    
    // Create timeout using AbortController (React Native compatible)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      
      // Clear timeout if request completes successfully
      clearTimeout(timeoutId);
      
      const duration = Date.now() - startTime;
      
      // Get raw response data first for logging
      let rawResponseData: any;
      try {
        const responseText = await response.text();
        rawResponseData = responseText ? JSON.parse(responseText) : {};
        
        // Log the raw server response
        console.log(`📥 [RAW RESPONSE ${method}] ${url}`, {
          status: response.status,
          statusText: response.statusText,
          duration: `${duration}ms`,
          rawResponse: rawResponseData,
        });
        
        // Recreate response for processing since we consumed the body
        const processableResponse = {
          ...response,
          json: async () => rawResponseData,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText
        };
        
        const result = await this.processApiResponseWithData<T>(processableResponse as Response, rawResponseData);
        
        if (result.success) {
          console.log(`✅ [PROCESSED SUCCESS ${method}] ${url}`, {
            status: response.status,
            duration: `${duration}ms`,
            processedMessage: result.message,
          });
        } else {
          console.log(`❌ [PROCESSED ERROR ${method}] ${url}`, {
            status: response.status,
            duration: `${duration}ms`,
            processedError: result.error,
          });
        }
        
        return result;
      } catch (parseError) {
        console.log(`📥 [RAW RESPONSE ${method}] ${url}`, {
          status: response.status,
          statusText: response.statusText,
          duration: `${duration}ms`,
          rawResponse: 'Failed to parse response',
          parseError: parseError.message,
        });
        
        const result = await this.processApiResponse<T>(response);
        return result;
      }
    } catch (error: any) {
      // Clear timeout in case of error
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      let errorMessage = 'An unexpected error occurred';
      
      if (this.isNetworkError(error)) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (this.isTimeoutError(error)) {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error(`🔥 [API ${method}] ${url}`, {
        duration: `${duration}ms`,
        error: error.message,
        type: error.name,
      });
      
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    }
  }
  
  /**
   * Log API call details for debugging
   */
  static logApiCall(
    method: string,
    url: string,
    requestData?: any,
    response?: StandardApiResponse,
    duration?: number
  ): void {
    const logData = {
      method,
      url,
      duration: duration ? `${duration}ms` : undefined,
      success: response?.success,
      message: response?.message,
    };
    
    if (requestData) {
      // Sanitize sensitive data
      const sanitized = { ...requestData };
      if (sanitized.password) sanitized.password = '[HIDDEN]';
      if (sanitized.token) sanitized.token = '[HIDDEN]';
      logData.request = sanitized;
    }
    
    if (response?.success) {
      console.log('✅ API Success:', logData);
    } else {
      console.log('❌ API Error:', logData);
    }
  }
}

// Export convenience functions
export const processApiResponse = ApiErrorHandler.processApiResponse.bind(ApiErrorHandler);
export const fetchWithErrorHandling = ApiErrorHandler.fetchWithErrorHandling.bind(ApiErrorHandler);
export const extractErrorMessage = ApiErrorHandler.extractErrorMessage.bind(ApiErrorHandler);
export const getStatusCodeMessage = ApiErrorHandler.getStatusCodeMessage.bind(ApiErrorHandler);

export default ApiErrorHandler;