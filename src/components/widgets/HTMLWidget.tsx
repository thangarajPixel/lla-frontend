"use client";

import { createElement, useMemo } from "react";
import sanitizeHtml from "sanitize-html";
import type { HTMLWidgetProps } from "./utils/widget";

const HTMLWidget = ({
  content,
  className = "",
  tag = "div",
  suppressHydrationWarning = true,
  ...props
}: HTMLWidgetProps) => {
  const sanitizedContent = useMemo(() => {
    const normalizedContent = (content || "").trim();
    if (!normalizedContent) return "";

    const sanitized = sanitizeHtml(normalizedContent, {
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
        "iframe",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "width", "height"],
        iframe: [
          "src",
          "width",
          "height",
          "frameborder",
          "allow",
          "allowfullscreen",
          "title",
          "loading",
          "sandbox",
          "class",
          "style",
        ],
        ul: ["style", "class", "type"],
        ol: ["style", "class", "type", "start"],
        li: ["style", "class", "value"],
        span: ["style", "class"],
        div: ["style", "class"],
        p: ["style", "class"],
        "*": ["class"],
      },
      allowedStyles: {
        "*": {
          color: [/.*/],
          "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
          "font-size": [/^\d+(?:px|em|rem|%)$/],
          "font-weight": [/^\d+$/, /^bold$/, /^normal$/],
          "font-family": [/^[\w\s-]+$/],
          "line-height": [/^\d+(?:\.\d+)?(?:px|em|rem|%)?$/],
          margin: [/^\d+(?:px|em|rem|%)$/],
          padding: [/^\d+(?:px|em|rem|%)$/],
          "background-color": [/.*/],
          "border-color": [/.*/],
          "list-style": [/.*/],
          "list-style-type": [/.*/],
          "list-style-position": [/^inside$/, /^outside$/],
          "list-style-image": [/.*/],
        },
      },
      allowedSchemes: ["http", "https", "mailto"],
      allowedSchemesByTag: {
        img: ["http", "https", "data"],
        iframe: ["http", "https"],
      },
    });

    const trimmed = sanitized.trim();
    if (!trimmed) return "";

    const textContent = trimmed
      .replace(/<br\s*\/?>/gi, "")
      .replace(/<[^>]*>/g, "")
      .trim();

    if (!textContent) {
      return "";
    }

    return trimmed;
  }, [content]);

  const blockLevelElements = /<(div|h[1-6]|ul|ol|blockquote|iframe|p)/i;
  const hasBlockElements = blockLevelElements.test(sanitizedContent);
  const finalTag = tag === "p" && hasBlockElements ? "div" : tag;

  return createElement(finalTag, {
    suppressHydrationWarning,
    className,
    dangerouslySetInnerHTML: { __html: sanitizedContent },
    ...props,
  });
};

export default HTMLWidget;
