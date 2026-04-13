import { useDimensions } from "./useDimensions";
import SizedSvg from "./SizedSvg";
import React, { useState, useId } from "react";

interface EntityBoxProps {
	children: string;
	type: "react" | "act" | "ws" | "it";
	cornerSize?: number;
	title?: string;
	subtitle?: string;
}

export const EntityTitle = ({ children }: any) => <h3 className="m-0">{children}</h3>;
export const EntitySubtitle = ({ children }: any) => <p className="m-0">{children}</p>;

// TODO: Split this component, maybe- it's a bit too long. Perhaps header and body could be split?
// :::box directive content will be rendered using the EntityBox component.
// Types: reaction, action, weapon/spell, item/trait for different boxes.
// Can be operated either by passing children containing Markdown-formatted header elements,
// or by directly passing a title and subtitle string.
export const EntityBox = ({
	children,
	type,
	cornerSize = 20,
	title,
	subtitle
}: EntityBoxProps) => {
	const [boxRef, { width, height }] = useDimensions();
	const [boxHeaderRef, { height: hHeight }] = useDimensions(); // only need height
	const [isCollapsed, setIsCollapsed] = useState(true);

	// aria accessibility id generation for the dropdown
	// i don't use this anywhere else and the id isn't really user-usable though
	// so i might have to change this later to actually carry information about the content
	const boxId = useId();
	const bodyId = `${boxId}-body`;
	const headerId = `${boxId}-header`;

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	// filtering by HTML attributes (see boxDirectivePlugin() in Markdown.tsx)
	const childrenArray = React.Children.toArray(children);
	// logging to get proper targeting
	console.log(
		"ID Elements:",
		childrenArray.map((c: any) => c.props?.["data-is-id"]),
	);
	// console.log("Children Type:", childrenArray.map((c: any) => c.type || "") )

	// We distinguish between left and right header elements by iterating thru the overall childrenArray
	// and then filtering out the ones that have "l" or "r" data-is-header attributes for the header.
	// This isn't necessarily the best, and I'd appreciate a rework, but it works for now.
	// Actually, it's extremely clunky and probably one of the worst things I've done in this codebase.

	// left header elements
	const leftHeaderElements = [
		...(title ? [<EntityTitle key="header-title">{title}</EntityTitle>] : []),
		...childrenArray.filter((child:any) => child.props?.["data-is-header"] === "l")
	];

	// right header elements
	const rightHeaderElements = [
		...(subtitle ? [<EntitySubtitle key="header-sub">{subtitle}</EntitySubtitle>] : []),
		...childrenArray.filter((child:any) => child.props?.["data-is-header"] === "r")
	];

	// body elements
	const bodyElements = childrenArray.filter((child: any) => {
		return !(
			child.props?.["data-is-header"] === "l" ||
			child.props?.["data-is-header"] === "r"
		);
	});

	// separate title getter to set id for stuff like aria
	const idElement = childrenArray.find((child: any) => {
		if (!child || typeof child !== "object" || "then" in child)
			return false;
		return (
			child.props?.["data-is-id"] === true ||
			child.props?.["data-is-id"] === "true"
		);
	});
	console.log(idElement);
	// const idText = idElement?.props?.children?.toString()
	// console.log(idText);

	return (
		// outer div
		<div
			ref={boxRef}
			className="isolate bg-none text-white leading-relaxed max-w-none flex flex-col gap-0 drop-shadow-lg mx-1 my-1 hover:scale-102 transition-[scale] duration-100 ease-out"
			style={{ "--cw": `${cornerSize}px` } as React.CSSProperties}
		>
			{/* A cursed way of doing things: adding cornerSize px of spacing here to compensate for corner size
      changes. Plausibly overengineered, but should work irrespective of browser font size changes to rem. */}
			{/* w-[calc(100%-var(--cw))] */}
			{/* header div */}
			<div ref={boxHeaderRef} className="relative w-full h-full">
				{/* header backdrop div */}
        {/* technically built as to ignore padding, but that's obsolete */}
				<div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
					<SizedSvg
						type={type}
						width={width}
						height={hHeight}
						cornerSize={cornerSize}
					/>
				</div>
				{/* header content div */}
				<div
					className="flex flex-row justify-between gap-2 items-baseline px-6 py-2"
				>
					<div>{leftHeaderElements}</div>
					<div className={`pr-(--cw) flex flex-row items-center gap-2`}>
						{rightHeaderElements}
						<button
							onClick={toggleCollapse}
							id={headerId}
							aria-controls={bodyId}
							aria-expanded={!isCollapsed}
							className={`size-4 transition-[rotate] duration-300 ease-out ${
                isCollapsed ? "rotate-90" : "rotate-0"}`}
						>
							{/* TODO: put in an actual icon instead of the svg */}
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
                <polygon points="5 25 50 75 95 25" className={`fill-white stroke-[#353a7a] stroke-width-10`}/>
              </svg>
            </button>
						{/* TODO: put another <button> with a plus here for adding a trait in the builder */}
						{/* needs to be togglable as an option, though */}
					</div>
				</div>
			</div>
			{/* body div */}
			<div
				id={bodyId}
				aria-labelledby={headerId}
				className={`-z-20 grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
					isCollapsed
						? "pointer-events-none grid-rows-[0fr]"
						: "pointer-events-auto grid-rows-[1fr]"
				}`}
			>
        {/* body dropdown div */}
        {/* empty, but enables the grid trick */}
				<div className="min-h-0">
          <div className="bg-white border-[#353a7a] border-2 border-t-0 text-[#353a7a] min-height-0 px-6 py-2">
            {bodyElements}
          </div>
        </div>
			</div>
		</div>
	);
};

export default EntityBox;
