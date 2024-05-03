import React, { useEffect, useState } from "react";

export const PanelContent: React.FC = () => {
  const [doc, setDoc] = useState<Document | undefined>(undefined);

  useEffect(() => {
    const iframe = document.getElementById(
      "storybook-preview-iframe",
    ) as HTMLIFrameElement;
    if (!iframe) return;

    const checkIframeLoaded = () => {
      try {
        // Access the iframe's document
        setDoc(iframe.contentDocument);
        if (!doc) return;
      } catch (error) {
        console.error("Error accessing iframe document:", error);
      }
    };

    // If the iframe is already loaded, check immediately
    if (
      iframe.contentDocument &&
      iframe.contentDocument.readyState === "complete"
    ) {
      checkIframeLoaded();
    } else {
      // Otherwise, wait for the load event
      iframe.addEventListener("load", checkIframeLoaded);
    }

    // Cleanup
    return () => {
      iframe.removeEventListener("load", checkIframeLoaded);
    };
  }, []);

  if (!doc) {
    console.warn("No document found");
    return <div>Loading...</div>;
  }

  const components = Array.from(doc.querySelector("#storybook-root")?.children);
  return components.map((component) => {
    const style = window.getComputedStyle(component);
    return (
      <div>
        {component.tagName} - {style.width} x {style.height}
      </div>
    );
  });
};
