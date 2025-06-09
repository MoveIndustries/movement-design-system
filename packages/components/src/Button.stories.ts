import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  args: { children: 'Primary Button', variant: 'primary' },
};

export const Secondary = {
  args: { children: 'Secondary Button', variant: 'secondary' },
};
