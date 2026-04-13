// The ModularWrapper component takes a module data category (see: core-1-0.ts), a string, and
// (optionally) a type of component to display the data as, if it's not the usual type.
// It should then handle the logic to render the data associated with that string in the correct
// component.
// For example, passing "jobs", "Aegis", and "Markdown" should render the data associated with the
// Aegis job as Markdown-formatted text.
// For now, only the EntityBox, Infobox, and Markdown exist. I'll implement Markdown, but leave
// TODO: EntityBox, Infobox rendering for anyone else.
import { useEngine } from "@/lib/context/EngineContext";
import EntityBox from "./EntityBox";
import Infobox from "./Infobox";
import Markdown from "./Markdown";

interface ModularWrapperProps {
  category: string;
  id: string;
  component?: string
}

export function ModularWrapper({ category, id, component = "Markdown"}: ModularWrapperProps) {
  // Right now, all components are rendered as Markdown by default.
  // TODO: Implement an if/then or case/switch to direct certain categories to the correct
  // components. For example, "description" should direct to Markdown and "techniques" should
  // direct to EntityBox. If a component is specified, use that component instead.
  // There are examples of the EntityBox component used outside of Markdown in page.tsx. I
  // would use that version rather than the Markdown formatted way, as the latter is a mess right
  // now.
  // Finally, remove the default parameter ("Markdown").
  const engine = useEngine();

  // Prevents extra lookups by returning null if no category or no id presented
  if (!category || !id) return null;

  const itemData = engine?.[category]?.[id];

  if (!itemData) {
    return (
      <div className="text-red-500 border border-red-200 p-2 text-xs">
        Missing {category} : {id} in current reflection modules!
      </div>
    )
  }

  switch (component) {
    case "Markdown":
      return (
        <Markdown content={itemData.asMarkdown || ""}/>
      )

    default:
      return (
        <Markdown content={"Component " + id + " from " + category + " doesn't have the right component." || ""}/>
      )
  }
}