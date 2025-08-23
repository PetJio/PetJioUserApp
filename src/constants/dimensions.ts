import { 
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

// Responsive dimensions helpers
export const wp = responsiveWidth;
export const hp = responsiveHeight;
export const rfs = responsiveFontSize;

// Standard spacing
export const SPACING = {
  xs: wp(1),
  sm: wp(2),
  md: wp(4),
  lg: wp(6),
  xl: wp(8),
  xxl: wp(10),
} as const;

// Font sizes
export const FONT_SIZES = {
  xs: rfs(1.2),
  sm: rfs(1.4),
  md: rfs(1.6),
  lg: rfs(1.8),
  xl: rfs(2.0),
  xxl: rfs(2.4),
  title: rfs(2.8),
  header: rfs(3.2),
} as const;

// Border radius
export const BORDER_RADIUS = {
  sm: wp(1),
  md: wp(2),
  lg: wp(3),
  xl: wp(4),
  round: wp(50),
} as const;

// Icon sizes
export const ICON_SIZES = {
  xs: wp(4),
  sm: wp(5),
  md: wp(6),
  lg: wp(8),
  xl: wp(10),
} as const;
