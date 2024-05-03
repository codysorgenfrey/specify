import React from "react";
import { DecoratorFunction } from "@storybook/types";
import {
  FluentProvider,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components";
import { ReactRenderer } from "@storybook/react";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
  },
});

export const FluentDecorator: DecoratorFunction<ReactRenderer> = (Story) => {
  const classes = useStyles();
  return (
    <FluentProvider className={classes.root} theme={webLightTheme}>
      <Story />
    </FluentProvider>
  );
};
