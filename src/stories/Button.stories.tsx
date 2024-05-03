import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@fluentui/react-components";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    appearance: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    appearance: "secondary",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    appearance: "outline",
    children: "Outline",
  },
};

export const Subtle: Story = {
  args: {
    appearance: "subtle",
    children: "Subtle",
  },
};

export const Transparent: Story = {
  args: {
    appearance: "transparent",
    children: "Transparent",
  },
};
