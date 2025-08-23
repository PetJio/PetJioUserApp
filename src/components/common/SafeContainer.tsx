import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../styles/colors';

interface SafeContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: any;
}

const SafeContainer: React.FC<SafeContainerProps> = ({
  children,
  backgroundColor = colors.background,
  edges = ['top', 'bottom'],
  style,
}) => {
  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeContainer;
