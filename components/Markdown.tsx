import React from "react";
import ReactMarkdown from "react-markdown";
import remarkWikiLink from "remark-wiki-link";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import type { Pluggable } from "unified";
import { EntityBox, EntityTitle, EntitySubtitle } from "./EntityBox";

const categoryIcons: Record<string, string> = {
	actions: "◎",
	items: "◒",
	conditions: "◍",
	spells: "◉",
};

// ===== Tagged Elements =====

/** boxDirectivePlugin
 * Behavior: Scans the Markdown for :::box tags. Instances of boxed text in the markdown won't be transformed
 *  unless they're wrapped in :::box. Formats them according to the EntityBox component.
 *  Note: It's still possible to access the EntityBox outside Markdown.
 * Returns: the modified DOM tree.
 * Parameters: None.
 *  When using the :::box tag:
 *  Use one of the four types (reaction (react), action (act), weapon/spell (ws), item/trait (it)) as an argument.
 *  Ex: :::box <content> :::{type=reaction}
 */
function boxDirectivePlugin() {
	return (tree: any) => {
		visit(tree, (node) => {
			// Check if the node is a multiline content directive with the name "box"
			if (node.type === "containerDirective") {
				if (node.name === "box") {
					node.data = node.data || {};
					node.data.hName = "EntityBox"; // Render as an <EntityBox> element
					node.data.hProperties = {
						className: "box", // Styling class
						type: node.attributes.type // Type, may be superfluous (?)
					};
				}
			}
			if (node.type === "leafDirective") {
				if (node.name === "boxTitle") {
					node.data = node.data || {};
					node.data.hName = "EntityTitle"; // Custom tag name
					node.data.hProperties = {
            dataIsHeader: "l",
						// className: "boxTitle" // Styling class (unused: might replace if we stop using
            // Tailwind for this project)
					};
				}
				if (node.name === "boxSubtitle") {
					node.data = node.data || {};
					node.data.hName = "EntitySubtitle"; // Custom tag name
					node.data.hProperties = {
            dataIsHeader: "r",
						// className: "boxSubtitle" // Styling class (unused)
					};
				}
			}
		});
	};
}

/** adxDirectivePlugin
 * Behavior: Handling of :adx[text] in the markdown, for rendering dice notation (like 1d6+3) in a special way.
 *  This doesn't do so automatically, however: input text must be manually noted. Instances of 1d6+3
 *  in the markdown won't be transformed unless they're wrapped in :adx[].
 * Returns: The modified DOM tree.
 * Parameters: None.
 */
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
	// Wikilink rendering.
	a: ({ href, children, ...props }) => {
		// Flatten children to a string to handle React nodes safely
		const text = React.Children.toArray(children)
			.map((child) => (typeof child === "string" ? child : ""))
			.join("");

		// Extract category from URL: decorative / maybe obsolete
		let category = "";
		if (href?.startsWith("/compendium/")) {
			const parts = href.split("/");
			category = parts[2]; // actions / items / conditions
		}

		const categoryClass = category ? `wiki-${category}` : "";
		const icon = categoryIcons[category] || ""; // decorative, not useful: experimental

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

	//EntityBox rendering.
	EntityBox: EntityBox,
	EntityTitle: EntityTitle,
	EntitySubtitle: EntitySubtitle,
};

// ===== Overall component =====
export default function Markdown({ content }: { content: string }) {
	return (
		<ReactMarkdown
			remarkPlugins={
				[
					remarkGfm,
					remarkDirective,
					adxDirectivePlugin,
					boxDirectivePlugin,
					[
						remarkWikiLink,
						{
							pageResolver: (name: string) => {
								//   if (name === "compendium") return [""]; // Special case for Compendium homepage
								return [
									name
										.trim()
										.toLowerCase()
										.replace(/\s+/g, "_"),
								]; // replaces spaces with underscores and lowercases the name for consistent linking
							},
							hrefTemplate: (permalink: string) =>
								`/compendium/${permalink}`,
						},
					],
				] as Pluggable[]
			}
			components={components}
		>
			{content}
		</ReactMarkdown>
	);
}
