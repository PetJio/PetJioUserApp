import { rfs } from '../constants/dimensions';

export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  // Font sizes
  fontSize: {
    xs: rfs(1.2),
    sm: rfs(1.4),
    base: rfs(1.6),
    lg: rfs(1.8),
    xl: rfs(2.0),
    '2xl': rfs(2.4),
    '3xl': rfs(3.0),
    '4xl': rfs(3.6),
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;
