import tools from "@/utils/tools";
import _ from "underscore";
import Image from "next/image";
import Link from "next/link";
import { Tool } from "@/types/types";
import { getAssetPath } from "@/utils/path";

/**
 * Header Component
 * 
 * The main navigation header for the D&D Tools application. It displays:
 * - Application logo and title
 * - Random selection of tool links (up to 5 tools)
 * 
 * The header is sticky (remains visible when scrolling) and uses a random
 * sample of available tools for navigation to keep the header compact.
 * 
 * Note: This is a server component (async function) in Next.js App Router.
 */
export default async function Header() {
    return (
        <header className="shadow-lg sticky top-0 z-50 ">
            <div className="container mx-auto py-4 flex justify-between items-center">
                {/* Logo and Title Section */}
                <Link href={"/"} className="flex items-center gap-2">
                    <Image 
                        src={getAssetPath('/logo.png')}
                        alt="D&D Tools" 
                        width={64} 
                        height={64} 
                        loading="eager"
                        unoptimized
                    />
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">D&D Tools</h1>
                    </div>
                </Link>
                
                {/* Navigation Links Section */}
                {/* Display a random sample of up to 5 tools for navigation */}
                <ul className="flex divide-slate-500 divide-x">
                    {_.sample(tools?.map((tool: Tool) => (
                        <Link 
                            href={tool.href} 
                            key={tool.name} 
                            className="px-4 hover:text-slate-400 transition duration-300">
                            {tool.name}
                        </Link>
                    )), 5)}
                </ul>
            </div>
        </header>
    );
}