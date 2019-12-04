const themeSpacing = amount => props => props.theme.spacing(amount);

const themeColor = colorName => props => props.theme.colors[colorName];

const textThemeColor = themeColor('text');

const themeMargin = props => props.theme.spacing(12);

export { themeColor, textThemeColor, themeSpacing, themeMargin };
