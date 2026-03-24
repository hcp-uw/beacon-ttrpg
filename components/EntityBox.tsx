import { useDimensions } from "./useDimensions";
import SizedSvg from "./SizedSvg";
import React from "react";

interface EntityBoxProps {
	children: string;
	type: "react" | "act" | "ws" | "it";
  cornerSize?: number;
}

export const EntityTitle = ({ children }: any) => (
	<h3>{children}</h3>
);

export const EntitySubtitle = ({ children }: any) => (
	<p>{children}</p>
);

// :::box directive content will be rendered using the EntityBox component.
// Types: reaction, action, weapon/spell, item/trait for different boxes.
export const EntityBox = ({ children, type, cornerSize = 20 }: EntityBoxProps) => {
	const [boxRef, { width, height }] = useDimensions();

	const childrenArray = React.Children.toArray(children);
  console.log("Children Props:", childrenArray.map((c: any) => c.props['data-is-header']));
  console.log("Children Type:", childrenArray.map((c: any) => c.type || "") )
	const headerElements = childrenArray.filter((child: any) => {
		return child.props?.['data-is-header'] === true || child.props?.['data-is-header'] === "true";
	});

	const bodyElements = childrenArray.filter((child: any) => {
		return !(child.props?.['data-is-header'] === true || child.props?.['data-is-header'] === "true");
	});

	return (
		<div
			ref={boxRef}
			className="isolate relative bg-none text-white px-6 py-3 gap-4 leading-relaxed max-w-none"
      style={{ '--cw': `${cornerSize}px` } as React.CSSProperties}
		>
			<div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
				<SizedSvg type={type} width={width} height={height} cornerSize={cornerSize} />
			</div>
      {/* A cursed way of doing things: adding cornerSize px of spacing here to compensate for corner size
      changes. Plausibly overengineered, but should work irrespective of browser font size changes to rem. */}
			<div className="flex flex-col w-[calc(100%-var(--cw))]">
				<div className="flex flex-row justify-between items-baseline">
          {headerElements}
        </div>
				<div className="gap-3">{bodyElements}</div>
			</div>
		</div>
	);
};

export default EntityBox;
