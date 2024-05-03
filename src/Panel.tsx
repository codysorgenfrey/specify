import React from "react";
import { AddonPanel } from "@storybook/components";
import { PanelContent } from "./components/PanelContent";

type PanelProps = {
  active: boolean;
  children: React.ReactNode;
};

export const Panel: React.FC<PanelProps> = (props) => {
  return (
    <AddonPanel {...props}>
      <PanelContent />
    </AddonPanel>
  );
};
