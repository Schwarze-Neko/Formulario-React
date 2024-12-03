import { Meta, StoryObj } from '@storybook/react';
import Form from './Form';

export default {
  title: 'Form',
  component: Form,
} as Meta<typeof Form>;

export const Default: StoryObj<typeof Form> = {
  args: {
    // Define default props for the Form here if needed
  },
};
