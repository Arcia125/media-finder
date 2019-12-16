const UNIT = 4;

const colors = {
  text: '#F4F4F4',
  gradientStart: '#1D2671',
  gradientEnd: '#C33764',
};

const spacing = amount => `${UNIT * amount}px`;

const primaryFontFamily = 'Lato';

const fontFamily = `'${primaryFontFamily}', sans-serif`;

const theme = {
  colors,
  spacing,
  fontFamily,
};

export { theme, primaryFontFamily };
