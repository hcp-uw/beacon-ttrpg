interface SizedSvgProps {
	type: "react" | "act" | "ws" | "it";
	width: number;
	height: number;
	strokeWidth?: number;
	cornerSize?: number;
}

// Creates the path used as the backdrop of the EntityBox component.
// Optional inputs: strokeWidth, cornerSize. Should generally be kept consistent sitewide, however.
const categoryPath = (
	type: string,
	height: number,
	width: number,
	strokeWidth: number,
	cornerSize: number,
) => {
	switch (type) {
		// for reactions: the funny-looking square loop box. overrides others. ("reaction")
		case "react":
			return `
        M ${strokeWidth / 2} ${strokeWidth / 2} 
        L ${strokeWidth / 2} ${height - strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${height - strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
        L ${width - cornerSize / 2 - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
        L ${width - cornerSize / 2 - strokeWidth / 2} ${strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${cornerSize / 2 + strokeWidth / 2} 
        L ${width - cornerSize - strokeWidth / 2} ${cornerSize / 2 + strokeWidth / 2} 
        L ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2}
        L ${strokeWidth / 2} ${strokeWidth / 2}
      `;
		// for actions: the inward circle cutout box. ("spell", "skill" with an action on it). NOT spell attacks. 
		case "act":
			return `
        M ${strokeWidth / 2} ${strokeWidth / 2} 
        L ${strokeWidth / 2} ${height - strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${height - strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
        A ${cornerSize + strokeWidth / 2} ${cornerSize + strokeWidth / 2} 0 0 1 ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2}
        L ${strokeWidth / 2} ${strokeWidth / 2}
      `;
		// for weapons, spell attacks: diagonal border. ("melee weapon", "ranged weapon", "spell attack", "skill attack")
		case "ws":
			return `
        M ${strokeWidth / 2} ${strokeWidth / 2} 
        L ${strokeWidth / 2} ${height - strokeWidth / 2}
        L ${width - strokeWidth / 2} ${height - strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
        L ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2} 
        L ${strokeWidth / 2} ${strokeWidth / 2}
      `;
		// for items, traits, and other equippables: outward circle cutout box. "skill", "support item" "spell"
		case "it":
			return `
        M ${strokeWidth / 2} ${strokeWidth / 2} 
        L ${strokeWidth / 2} ${height - strokeWidth / 2} 
        L ${width - strokeWidth / 2} ${height - strokeWidth / 2}  
        L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
        A ${cornerSize - strokeWidth / 2} ${cornerSize - strokeWidth / 2} 0 0 0 ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2}
        L ${strokeWidth / 2} ${strokeWidth / 2}
      `;
	}
};

const SizedSvg = ({
	type,
	width,
	height,
	strokeWidth = 0, // defaulting to 0 but changeable
	cornerSize = 30,
}: SizedSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		strokeWidth={strokeWidth}
		viewBox={`0 0 ${width} ${height}`}
		// className="drop-shadow-lg"
	>
		<path
			d={categoryPath(type, height, width, strokeWidth, cornerSize)}
			className={`fill-[#353a7a] stroke-white`}
		/>
	</svg>
);

export default SizedSvg;

/** react double-corner
 * M ${strokeWidth / 2} ${strokeWidth / 2} 
  L ${strokeWidth / 2} ${height - strokeWidth / 2} 
  L ${width - cornerSize - strokeWidth / 2} ${height - strokeWidth / 2} 
  L ${width - cornerSize - strokeWidth / 2} ${height - cornerSize / 2 - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${height - cornerSize / 2 - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${height - strokeWidth / 2} 
  L ${width - cornerSize / 2 - strokeWidth / 2} ${height - strokeWidth / 2} 
  L ${width - cornerSize / 2 - strokeWidth / 2} ${height - cornerSize - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${height - cornerSize - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
  L ${width - cornerSize / 2 - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
  L ${width - cornerSize / 2 - strokeWidth / 2} ${strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${cornerSize / 2 + strokeWidth / 2} 
  L ${width - cornerSize - strokeWidth / 2} ${cornerSize / 2 + strokeWidth / 2} 
  L ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2}
  L ${strokeWidth / 2} ${strokeWidth / 2}
 */

/** act double-corner
 * M ${strokeWidth / 2} ${strokeWidth / 2} 
  L ${strokeWidth / 2} ${height - strokeWidth / 2} 
  L ${width - cornerSize - strokeWidth / 2} ${height - strokeWidth / 2} 
  A ${cornerSize + strokeWidth / 2} ${cornerSize + strokeWidth / 2} 0 0 1 ${width - strokeWidth / 2} ${height - cornerSize - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
  A ${cornerSize + strokeWidth / 2} ${cornerSize + strokeWidth / 2} 0 0 1 ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2}
  L ${strokeWidth / 2} ${strokeWidth / 2}
*/

/** ws double-corner
 * M ${strokeWidth / 2} ${strokeWidth / 2} 
  L ${strokeWidth / 2} ${height - strokeWidth / 2}
  L ${width - cornerSize - strokeWidth / 2} ${height - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${height - cornerSize - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
  L ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2} 
  L ${strokeWidth / 2} ${strokeWidth / 2}
 */

/** it double-corner
 * M ${strokeWidth / 2} ${strokeWidth / 2} 
  L ${strokeWidth / 2} ${height - strokeWidth / 2} 
  L ${width - cornerSize - strokeWidth / 2} ${height - strokeWidth / 2} 
  A ${cornerSize - strokeWidth / 2} ${cornerSize - strokeWidth / 2} 0 0 0 ${width - strokeWidth / 2} ${height - cornerSize - strokeWidth / 2} 
  L ${width - strokeWidth / 2} ${cornerSize + strokeWidth / 2} 
  A ${cornerSize - strokeWidth / 2} ${cornerSize - strokeWidth / 2} 0 0 0 ${width - cornerSize - strokeWidth / 2} ${strokeWidth / 2}
  L ${strokeWidth / 2} ${strokeWidth / 2}
 */
