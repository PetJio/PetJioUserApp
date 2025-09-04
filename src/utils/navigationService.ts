import { NavigationContainerRef, CommonActions } from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function reset(routeName: string) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    })
  );
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export default {
  navigate,
  reset,
  goBack,
  getCurrentRoute,
};