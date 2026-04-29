"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ label: "Introduction", icon: "0" },
	{ label: "How to Play", icon: "1" },
	{ label: "Anatomy of a Beacon", icon: "2" },
	{ label: "Quests", icon: "3" },
	{ label: "Narrative Play", icon: "4" },
	{ label: "Combat Play", icon: "5" },
	{ label: "Ancestries", icon: "6" },
	{ label: "Classes and Jobs", icon: "7" },
	{ label: "Talents", icon: "8" },
	{ label: "Basic Equipment and Techniques", slug: "basic_equipment_and_techniques", icon: "9" },
	{ label: "Appendices", icon: "A" },
];

const CompendiumNavMenu = () => {
  const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-3">
			{navItems.map((item) => {
				const isActive = pathname === `/compendium/${item.slug ?? item.label.trim().toLowerCase().replace(/\s+/g, "_")}`;

				return (
					<Link
						key={item.label}
						href={`/compendium/${item.slug ?? item.label.trim().toLowerCase().replace(/\s+/g, "_")}`}
						className={[
              "w-full text-left flex items-center gap-3 px-3 transition-colors duration-200",
              isActive 
                ? "bg-gradient-to-r from-[#7c83c7] via-[#c7cbe6] to-[#efeff2] text-[#23244a]" 
                : "hover:bg-[#B5E3FF] text-[#000000]"
            ].join(" ")}
					>
						{/* <span className="w-7 text-center">{item.icon}</span> */}

						<span
							className={[
								"text-xl font-serif font-semibold",	isActive ? "text-[#292F5E]" : "underline text-[#41AFF3]",].join(" ")}>
							{item.label}
						</span>
					</Link>
				);
			})}
		</nav>
	);
};

export default CompendiumNavMenu;
