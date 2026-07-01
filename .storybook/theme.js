// import { GrafanaTheme2 } from '@grafana/data';
import { create } from '@storybook/theming';

export const createStorybookTheme = () => {
  return create({
    base: 'dark',
    
    // Brand colors
    colorPrimary: '#15EDEB', // Movement Cyan
    colorSecondary: '#15EDEB', // Movement Cyan

    // UI
    appBg: '#111111', // dark.400 equivalent
    appContentBg: '#101010', // dark.400 equivalent
    appBorderColor: '#45454F', // dark.600 equivalent
    appBorderRadius: 8,

    // Typography
    fontBase: '"ABC Oracle", sans-serif',
    fontCode: 'ui-monospace, monospace',
    fontHeading: '"ABC Oracle", sans-serif',

    // Text colors
    textColor: '#ffffff', // neutrals.white
    textInverseColor: '#000000', // neutrals.black

    // Toolbar default and active colors
    barTextColor: '#ffffff', // neutrals.white
    barSelectedColor: '#15EDEB', // Movement Cyan
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
    brandImage: "../src/assets/branding/Logo_Movement_Full_White.svg",
  });
};
