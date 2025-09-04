import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BORDER_RADIUS, SPACING } from '../../constants/dimensions';
import colors from '../../styles/colors/index';
import { shadows } from '../../styles/shadows';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  padding?: number;
  margin?: number;
  borderRadius?: number;
  backgroundColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = SPACING.md,
  margin = 0,
  borderRadius = BORDER_RADIUS.md,
  backgroundColor = colors.white,
  shadow = 'md',
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
          margin,
          borderRadius,
          backgroundColor,
        },
        shadows[shadow],
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // Base card styles
  },
});

export default Card;
