import type { Preview } from "@storybook/react";
import { FluentDecorator } from "./fluentDecorator";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [FluentDecorator],
};

export default preview;
