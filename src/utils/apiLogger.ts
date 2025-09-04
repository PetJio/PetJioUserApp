// API Logger Utility
export interface ApiLogData {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
  response?: any;
  statusCode?: number;
  error?: any;
  duration?: number;
}

export class ApiLogger {
  private static isDevelopment = __DEV__;
  
  /**
   * Log API request details
   */
  static logRequest(method: string, url: string, headers?: Record<string, string>, body?: any): void {
    if (!this.isDevelopment) return;
    
    const timestamp = new Date().toISOString();
    const sanitizedHeaders = this.sanitizeHeaders(headers);
    const sanitizedBody = this.sanitizeBody(body);
    
    console.log(`🚀 [API REQUEST] ${timestamp}`);
    console.log(`📍 ${method.toUpperCase()} ${url}`);
    
    if (sanitizedHeaders && Object.keys(sanitizedHeaders).length > 0) {
      console.log(`📋 Headers:`, sanitizedHeaders);
    }
    
    if (sanitizedBody) {
      console.log(`📦 Body:`, sanitizedBody);
    }
    
    console.log(`─────────────────────────────────────`);
  }
  
  /**
   * Log API response details
   */
  static logResponse(method: string, url: string, statusCode: number, response?: any, duration?: number): void {
    if (!this.isDevelopment) return;
    
    const timestamp = new Date().toISOString();
    const statusEmoji = statusCode >= 200 && statusCode < 300 ? '✅' : '❌';
    const sanitizedResponse = this.sanitizeResponse(response);
    
    console.log(`${statusEmoji} [API RESPONSE] ${timestamp}`);
    console.log(`📍 ${method.toUpperCase()} ${url}`);
    console.log(`📊 Status: ${statusCode}`);
    
    if (duration) {
      console.log(`⏱️ Duration: ${duration}ms`);
    }
    
    if (sanitizedResponse) {
      console.log(`📥 Response:`, sanitizedResponse);
    }
    
    console.log(`─────────────────────────────────────`);
  }
  
  /**
   * Log API error details
   */
  static logError(method: string, url: string, error: any, duration?: number): void {
    if (!this.isDevelopment) return;
    
    const timestamp = new Date().toISOString();
    
    console.log(`🔥 [API ERROR] ${timestamp}`);
    console.log(`📍 ${method.toUpperCase()} ${url}`);
    
    if (duration) {
      console.log(`⏱️ Duration: ${duration}ms`);
    }
    
    console.log(`💥 Error:`, {
      message: error?.message || 'Unknown error',
      code: error?.code,
      status: error?.status,
      stack: error?.stack?.split('\n').slice(0, 5).join('\n') // First 5 lines of stack
    });
    
    console.log(`─────────────────────────────────────`);
  }
  
  /**
   * Complete API call logging with request, response, and timing
   */
  static logApiCall(data: ApiLogData): void {
    if (!this.isDevelopment) return;
    
    const { method, url, headers, body, response, statusCode, error, duration } = data;
    
    // Log request
    this.logRequest(method, url, headers, body);
    
    // Log response or error
    if (error) {
      this.logError(method, url, error, duration);
    } else if (statusCode !== undefined) {
      this.logResponse(method, url, statusCode, response, duration);
    }
  }
  
  /**
   * Sanitize headers to remove sensitive information
   */
  private static sanitizeHeaders(headers?: Record<string, string>): Record<string, string> | undefined {
    if (!headers) return undefined;
    
    const sensitiveKeys = ['authorization', 'cookie', 'x-api-key', 'x-auth-token'];
    const sanitized = { ...headers };
    
    Object.keys(sanitized).forEach(key => {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        sanitized[key] = '[HIDDEN]';
      }
    });
    
    return sanitized;
  }
  
  /**
   * Sanitize request body to remove sensitive information
   */
  private static sanitizeBody(body?: any): any {
    if (!body) return undefined;
    
    try {
      const parsed = typeof body === 'string' ? JSON.parse(body) : body;
      const sensitiveKeys = ['password', 'token', 'secret', 'key', 'apiKey'];
      const sanitized = { ...parsed };
      
      Object.keys(sanitized).forEach(key => {
        if (sensitiveKeys.includes(key.toLowerCase())) {
          sanitized[key] = '[HIDDEN]';
        }
      });
      
      return sanitized;
    } catch (error) {
      return '[Invalid JSON Body]';
    }
  }
  
  /**
   * Sanitize response to remove sensitive information
   */
  private static sanitizeResponse(response?: any): any {
    if (!response) return undefined;
    
    try {
      const sensitiveKeys = ['token', 'password', 'secret', 'apiKey', 'refreshToken'];
      const sanitized = { ...response };
      
      Object.keys(sanitized).forEach(key => {
        if (sensitiveKeys.includes(key.toLowerCase())) {
          sanitized[key] = '[HIDDEN]';
        }
      });
      
      return sanitized;
    } catch (error) {
      return response;
    }
  }
  
  /**
   * Create a wrapper for fetch with automatic logging
   */
  static async fetchWithLogging(
    url: string, 
    options: RequestInit = {}
  ): Promise<Response> {
    const startTime = Date.now();
    const method = options.method || 'GET';
    const headers = options.headers as Record<string, string>;
    const body = options.body;
    
    // Log request
    this.logRequest(method, url, headers, body);
    
    try {
      const response = await fetch(url, options);
      const duration = Date.now() - startTime;
      
      // Clone response to read it without consuming the original
      const responseClone = response.clone();
      let responseData;
      
      try {
        responseData = await responseClone.json();
      } catch (jsonError) {
        responseData = await responseClone.text();
      }
      
      // Log response
      this.logResponse(method, url, response.status, responseData, duration);
      
      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Log error
      this.logError(method, url, error, duration);
      
      throw error;
    }
  }
  
  /**
   * Enable/disable logging (useful for production)
   */
  static setLoggingEnabled(enabled: boolean): void {
    this.isDevelopment = enabled;
  }
}

// Export convenience methods
export const logApiRequest = ApiLogger.logRequest.bind(ApiLogger);
export const logApiResponse = ApiLogger.logResponse.bind(ApiLogger);
export const logApiError = ApiLogger.logError.bind(ApiLogger);
export const logApiCall = ApiLogger.logApiCall.bind(ApiLogger);
export const fetchWithLogging = ApiLogger.fetchWithLogging.bind(ApiLogger);

export default ApiLogger;