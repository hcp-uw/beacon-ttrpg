import Link from "next/link";

interface NavbarProps {
  content?: Array<string>;
}


/** Navbar
 * Behavior: Navbar component with button to navigate to home and customizable upper-right links.
 * Returns: Navbar component.
 * Parameters: Content: array of strings for upper right navigation bar.
 *  Default params: "Beacons" , "Compendium". Params must be capitalized. 
 *  Params will navigate to the lowercased version of those params.
 */
const Navbar = ({content = ["Beacons", "Compendium"]}: NavbarProps) => {
  return (
    <header className="h-14 text-white bg-gradient-to-r from-[#3b3f7c] via-[#3a3f69] to-[#3a3a3a] shadow-lg border-b-2 border-[#ffffff] flex items-center justify-between px-8">
      <Link href={`/`} className="text-4xl tracking-[0.2em] font-source opacity-90 hover:opacity-100 transition">
        SOURCE
      </Link>

      <nav className="flex items-center gap-12 text-xl tracking-[0.4em] uppercase font-heading">
        {(content).map((navString, index) => (
          <Link href={`/${navString.toLowerCase()}`} key={index} className="opacity-90 hover:opacity-100 transition">
            {navString}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Navbar;