import React, { useEffect, useState } from "react";

const parameters = {
  specify: {
    components: [
      {
        title: "Button",
        selector: ".fui-Button",
        parts: [
          {
            title: "Container",
            properties: [
              "background-color",
              "border-radius",
              "padding-inline",
              "padding-block",
            ],
          },
          {
            title: "Label",
            properties: [
              "color",
              "font-size",
              "font-weight",
              "font-family",
              "line-height",
            ],
          },
          {
            title: "Icon",
            selector: ".fui-Button__icon",
            properties: ["color", "height", "width"],
          },
        ],
      },
    ],
  },
};

function getMatchedCSSRules(el: Element) {
  const sheets = document.styleSheets;
  const ret = [];

  for (var i in sheets) {
    const rules = sheets[i].cssRules;
    for (var r in rules) {
      const rule = rules[r] as CSSStyleRule;
      if (!rule.selectorText) continue;
      if (el.matches(rule.selectorText)) {
        ret.push(rule.cssText);
      }
    }
  }

  return ret;
}

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

  const root = doc.querySelector("#storybook-root");
  if (!root) console.error("No storybook root element found");

  return parameters.specify.components.map((component) => {
    if (!component) return null;
    return (
      <div id="component" key={component.title}>
        <h1>{component.title}</h1>
        <div id="parts">
          {component.parts.map((part) => {
            if (!part) return null;
            const componentEl =
              root.querySelector(component.selector) || root.firstElementChild;
            if (!componentEl) {
              console.error("No component on page");
              return null;
            }
            const partEl =
              (part.selector && componentEl.querySelector(part.selector)) ||
              componentEl;
            if (typeof partEl !== "object") {
              console.error("Part not on page", part.title);
              return null;
            }
            console.log(getMatchedCSSRules(partEl));
            const partStyle = window.getComputedStyle(partEl);
            return (
              <div id="part" key={part.title}>
                <h2>{part.title}</h2>
                <ul>
                  {part.properties.map((property: string) => {
                    if (!property) return null;
                    return (
                      <li id="property" key={property}>
                        <h3>{property}</h3>
                        <span>{partStyle.getPropertyValue(property)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};
