import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@fluentui/react-components";
import { Calendar20Regular } from "@fluentui/react-icons";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  argTypes: {
    appearance: {
      options: ["primary", "secondary", "outline", "subtle", "transparent"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    shape: {
      options: ["rounded", "circular", "square"],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    disabledFocusable: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "object" },
    },
    iconPosition: {
      options: ["before", "after"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Button",
    icon: <Calendar20Regular />,
  },
};

export const IconOnly: Story = {
  args: {
    icon: <Calendar20Regular />,
  },
};
