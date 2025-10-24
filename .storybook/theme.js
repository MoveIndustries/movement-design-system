// import { GrafanaTheme2 } from '@grafana/data';
import { create } from '@storybook/theming';

export const createStorybookTheme = () => {
  return create({
    base: 'dark',
    
    // Brand colors
    colorPrimary: '#ffd935', // moveus-marigold.400
    colorSecondary: '#ffd935', // byzantine-blue.400
    textColor: '#F0F0F0', // off white

    // UI
    appBg: '#111111', // dark.400 equivalent
    appContentBg: '#101010', // dark.400 equivalent
    appBorderColor: '#45454F', // dark.600 equivalent
    appBorderRadius: 8,

    // Typography
    fontBase: '"neue-haas-unica", sans-serif',
    fontCode: '"TWK Everett Mono", monospace',
    fontHeading: '"TWK Everett", sans-serif',

    // Text colors
    textColor: '#ffffff', // neutrals.white
    textInverseColor: '#000000', // neutrals.black

    // Toolbar default and active colors
    barTextColor: '#ffffff', // neutrals.white
    barSelectedColor: '#ffd935', // moveus-marigold.400
    barBg: '#1F1F21', // dark.400 equivalent

    // Form colors
    inputBg: '#2A2A2E', // dark.200 equivalent
    inputBorder: '#45454F', // dark.600 equivalent
    inputTextColor: '#ffffff', // neutrals.white
    inputBorderRadius: 4,

    // Code block colors
    codeBg: '#2A2A2E', // dark background for code blocks
    codeColor: '#ffffff', // white text for code

    // Brand
    brandTitle: 'Movement Design System',
    brandUrl: './',
    brandImage: "../src/assets/logo.svg",
    // brandImage: require('../src/assets/logo.svg'),
  });
};
