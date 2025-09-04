import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../styles/colors/index';

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
