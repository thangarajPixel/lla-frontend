"use client";

import { createElement } from "react";
import sanitizeHtml from "sanitize-html";
import type { HTMLWidgetProps } from "./utils/widget";

const HTMLWidget = ({
  content,
  className = "",
  tag = "div",
  suppressHydrationWarning = false,
  ...props
}: HTMLWidgetProps) => {
  const sanitizedContent = sanitizeHtml(content || "", {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "span",
      "div",
      "blockquote",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      span: ["style", "class"],
      div: ["style", "class"],
      p: ["style", "class"],
      "*": ["class"],
    },
    allowedStyles: {
      "*": {
        color: [/^#[0-9A-Fa-f]{6}$/, /^rgb/, /^rgba/],
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
        "font-size": [/^\d+(?:px|em|rem|%)$/],
        "font-weight": [/^\d+$/, /^bold$/, /^normal$/],
        "font-family": [/^[\w\s-]+$/],
        "line-height": [/^\d+(?:\.\d+)?(?:px|em|rem|%)?$/],
        margin: [/^\d+(?:px|em|rem|%)$/],
        padding: [/^\d+(?:px|em|rem|%)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
    },
  });

  return createElement(tag, {
    suppressHydrationWarning,
    className,
    dangerouslySetInnerHTML: { __html: sanitizedContent },
    ...props,
  });
};

export default HTMLWidget;
