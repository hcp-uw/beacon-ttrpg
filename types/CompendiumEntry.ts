// handles compendium entry formatting and typing. This is the type that the Firestore compendium entry documents should conform to.
export type CompendiumEntry = {
  body?: string;
  infoboxes?: Array<string>;
  redirect?: string;
  ruleset?: string;
  title?: string;
};