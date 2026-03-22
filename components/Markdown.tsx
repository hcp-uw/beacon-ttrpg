import React from "react";
import ReactMarkdown from "react-markdown";
import remarkWikiLink from "remark-wiki-link";
import remarkGfm from 'remark-gfm'
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import type { Pluggable } from "unified";
import ProseWrapper from "@/components/ProseWrapper";

const categoryIcons: Record<string, string> = {
  actions: "◎",
  items: "◒",
  conditions: "◍",
  spells: "◉",
};

// ===== Tagged Elements =====

// :::box (TODO: update with color/corner variants for talents, spells, reactions. etc.)
// Handling of :::box[text] in the markdown, for rendering boxed text (like actions or items) in a special way.
// This doesn't do so automatically, however: input text must be manually noted. Instances of boxed text
// in the markdown won't be transformed unless they're wrapped in :box[].
function boxDirectivePlugin() {
  return (tree: any) => {
      visit(tree, (node) => {
        // Check if the node is a multiline content directive with the name "box"
        if(node.type === "containerDirective" && node.name === "box") {
          node.data = node.data || {};
          node.data.hName = "EntityBox"; // Render as an <EntityBox> element
          node.data.hProperties = {
            className: "box" // Styling class
          }
          if (node.type === "leafDirective") {
            if (node.name === "boxTitle") {
              node.data = node.data || {};
              node.data.hName = "EntityTitle"; // Custom tag name
              node.data.hProperties = {
                className: "boxTitle" // Styling class
              }
            }
            if (node.name === "boxSubtitle") {
              node.data = node.data || {};
              node.data.hName = "EntitySubtitle"; // Custom tag name
              node.data.hProperties = {
                className: "boxSubtitle", // Add a class for styling
              };
            }
          }
        }
      });
  };
}

// :adx
// Handling of :adx[text] in the markdown, for rendering dice notation (like 1d6+3) in a special way.
// This doesn't do so automatically, however: input text must be manually noted. Instances of 1d6+3
// in the markdown won't be transformed unless they're wrapped in :adx[].
function adxDirectivePlugin() {
  return (tree: any) => {
    visit(tree, (node) => {
      // Check if the node is a text directive with the name "adx"
      if (node.type === "textDirective" && node.name === "adx") {
        node.data = node.data || {};
        node.data.hName = "span"; // Render as a <span> element
        node.data.hProperties = {
          className: "adx", // Add a class for styling
        };
      }
    });
  };
}

const components: Record<string, React.ComponentType<any>> = {

  a: ({ href, children, ...props }) => {
    // Flatten children to a string to handle React nodes safely
    const text = React.Children.toArray(children)
      .map((child) => (typeof child === "string" ? child : ""))
      .join("");

    // Extract category from URL
    let category = "";
    if (href?.startsWith("/compendium/")) {
      const parts = href.split("/");
      category = parts[2]; // actions / items / conditions
    }

    const categoryClass = category ? `wiki-${category}` : "";
    const icon = categoryIcons[category] || "";

    return (
      <a
        href={href}
        {...props}
        className={`inline-flex items-center gap-1 font-bold small-caps ${categoryClass}`}
      >
        {icon && <span>{icon}</span>}
        <span>{text}</span>
      </a>
    );
  },

  // :::box directive content will be rendered using the EntityBox component, which applies Infobox.tsx-based styling/
  // May change.
  EntityBox: ({ children }: any) => (
    <div className="bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b] text-white shadow-xl border-2 border-white px-6 py-3 gap-4">
      <div className={"leading-relaxed max-w-none"}>
        {children}
      </div>
    </div>
  ),

  EntityTitle: ({ children }: any) => (
    <h3>
      {children}
    </h3>
  ),

  EntitySubtitle: ({ children }: any) => (
    <ProseWrapper className="prose-invert">
      {children}
    </ProseWrapper>
  ),

  // All prose elements
  // We wrap these individually so they get the doc-styling (tables, etc.) without killing the 
  // boxes, which can't be wrapped.
  // This is extremely inconvenient and I would have liked a workaround, but oh well.
  p: (props: any) => <ProseWrapper Tag="p" {...props} />,
  table: (props: any) => <ProseWrapper Tag="table" {...props} />,
  ul: (props: any) => <ProseWrapper Tag="ul" {...props} />,
  ol: (props: any) => <ProseWrapper Tag="ol" {...props} />,
  h1: (props: any) => <ProseWrapper Tag="h1" {...props} />,
  h2: (props: any) => <ProseWrapper Tag="h2" {...props} />,
  blockquote: (props: any) => <ProseWrapper Tag="blockquote" {...props} />,
  hr: (props: any) => <hr className="border-white/20 my-4" />,
}

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins = {[
        remarkGfm,
        remarkDirective,
        adxDirectivePlugin,
        boxDirectivePlugin,
        [
          remarkWikiLink,
          {
            pageResolver: (name: string) => {
            //   if (name === "compendium") return [""]; // Special case for Compendium homepage
              return [name.trim().toLowerCase().replace(/\s+/g, "_")]; // replaces spaces with underscores and lowercases the name for consistent linking
            },
            hrefTemplate: (permalink: string) => `/compendium/${permalink}`,
          },
        ],
      ] as Pluggable[]}
       components = {components}
    >
      {content}
    </ReactMarkdown>
  );
}