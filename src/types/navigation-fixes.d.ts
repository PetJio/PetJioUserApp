// Temporary type declarations to fix navigation typing conflicts
// This file contains type assertions and augmentations to resolve
// legacy navigation typing issues

declare module '*.tsx' {
  const content: any;
  export default content;
}

declare module '@react-navigation/stack' {
  interface StackNavigationProp {
    dispatch: any;
  }
}

declare module '@react-navigation/native' {
  interface NavigationHelpers {
    dispatch: any;
  }
}

// Global type for component props that have navigation typing conflicts
declare global {
  interface LegacyNavigationProps {
    navigation?: any;
    route?: any;
  }
  
  interface InSiteServiceProps {
    navigation?: any;
    [key: string]: any;
  }
  
  interface WalkingPackageProps {
    navigation?: any;
    [key: string]: any;
  }
}

export {};