import tools from "@/utils/tools";
import { Divider } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

/**
 * Home Page Component
 * 
 * The main landing page of the D&D Tools application. It displays:
 * - Application logo and title
 * - Description of the application
 * - Grid of available tools with links
 * - "Coming Soon" placeholder for future tools
 * 
 * This page serves as the entry point and navigation hub for all available tools.
 */
export default function Home() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      {/* Logo and Title Section */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        {/* Logo with hover effect (grayscale on hover) */}
        <Image 
          src={'/logo.png'} 
          alt="D&D Tools" 
          width={138} 
          height={138} 
          className="grayscale-0 transition duration-300 hover:grayscale" 
        />
        <h1 className="text-3xl text-orange-700 font-bold">Dungeons & Dragons Tools</h1>
      </Link>

      <Divider className="my-8" />

      {/* Application Description Section */}
      <div className="max-w-5xl text-justify text-last-center text-las">
        <p className="text-lg text-zinc-300 leading-relaxed ">
          A comprehensive collection of tools and utilities designed to enhance your Dungeons & Dragons gameplay experience.
          Whether you&apos;re a Dungeon Master planning your next session or a player managing your character,
          these tools help streamline your adventures and make your D&D sessions more enjoyable.
        </p>
        <p className="text-md text-zinc-400 mt-4">
          Features include character management, dice rollers, spell references, and more to support your tabletop adventures.
        </p>
      </div>

      <Divider className="my-8" />

      {/* Tools Grid Section */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Render each tool as a clickable card */}
        {tools.map((tool) => {
          return (
            <Link 
              href={tool.href} 
              key={tool.name} 
              className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition duration-300 border-2 group gap-2 flex flex-col border-orange-700">
              <h2 className="text-xl text-orange-700 font-bold">{tool.name}</h2>
              <p className="text-sm text-zinc-200 group-hover:text-zinc-300 transition duration-300 font-light">{tool.description}</p>
            </Link>
          )
        })}
        {/* Placeholder card for upcoming tools */}
        <div className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition duration-300 border-2 group gap-2 flex flex-col border-orange-700 opacity-70">
          <h2 className="text-xl text-orange-700 font-bold">Coming Soon</h2>
          <p className="text-sm text-zinc-200 group-hover:text-zinc-300 transition duration-300 font-light">
            New tools will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
}
