# 🎲 D&D Tools

A comprehensive toolkit for Dungeons & Dragons players and storytellers, featuring fantasy name generators and other useful utilities.

## ✨ Features

### 🎭 Name Generator
- **Alien Names**: Generate space and alien-sounding names
- **Amazon Names**: Generate Amazonian and warrior names
- **Anansi Names**: Generate Akan/Ghanaian-inspired names from African culture
- **Angel Names**: Generate angelic names with gender support (male, female, neutral)

Each generator includes:
- ✅ Sensitivity filter to prevent inappropriate content
- ✅ Advanced algorithms for natural-sounding name generation
- ✅ Gender support (neutral, male, female) where applicable
- ✅ Client-side generation (no API routes needed)
- ✅ Complete documentation and optimized code

### 🎲 Dice Roller
Simple and practical tool for rolling D&D dice

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dnd-tools

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Running the Project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
dnd-tools/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── name-generator/     # Name generator page
│   │   ├── dice-roller/        # Dice roller page
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── name-generator.tsx  # Main name generator component
│   │   ├── dice-roller.tsx     # Dice roller component
│   │   └── header.tsx          # Navigation header
│   └── utils/
│       ├── generators/
│       │   └── names/          # Name generator modules
│       │       ├── alien.ts    # Alien name generator
│       │       ├── amazon.ts   # Amazon name generator
│       │       ├── anansi.ts   # Anansi/Akan name generator
│       │       └── angel.ts    # Angel name generator (with gender support)
│       ├── name-generators.ts  # Client-side generator utilities
│       ├── sensitivity-check.ts
│       └── copy-to-clipboard.ts
├── package.json
└── README.md
```

## 🔧 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: HeroUI (NextUI fork)
- **Animations**: Framer Motion
- **Icons**: React Icons

## 🎨 Architecture

### Client-Side Name Generation

This project uses **client-side name generation** instead of API routes, making it:
- ✅ Compatible with static export (GitHub Pages)
- ✅ Faster (no network latency)
- ✅ Simpler architecture (no server required)
- ✅ Better for deployment on static hosting

Names are generated directly in the browser using utility functions from `src/utils/name-generators.ts`.

### Gender Support

Some generators (like Angel) support multiple genders:
- **Neutral**: Gender-neutral names (always available)
- **Male**: Masculine names (optional)
- **Female**: Feminine names (optional)

The UI automatically displays all available gender categories.

## 🛠️ Scripts

```bash
npm run dev      # Run development server
npm run build    # Build project for production
npm run start    # Run production server
npm run lint     # Lint code with ESLint
```

## 🎯 Adding a New Name Generator

1. Create a new file in `src/utils/generators/names/` (e.g., `elf.ts`)

2. Implement the generator function with the following structure:

```typescript
import SensitivityCheck from "@/utils/sensitivity-check"

const COUNT = 10
const MAX_ATTEMPTS = 1000

const ElfNames = (): Response => {
    // Your name generation logic here
    const generate = (): string => {
        // Generate a single name
        // Must use SensitivityCheck(name) before returning
        let name = ""
        // ... generation logic ...
        return name
    }
    
    // Return names organized by gender
    // At minimum, include "neutral" key
    const names: Record<string, string[]> = {
        neutral: []
    }
    
    // Generate names for each gender
    for (let i = 0; i < COUNT; i++) {
        names.neutral[i] = generate()
    }
    
    // Optional: Add male and female if your generator supports it
    // names.male = [...]
    // names.female = [...]
    
    return Response.json(names)
}

export default ElfNames
```

3. In `src/utils/name-generators.ts`:
   - Import your generator: `import ElfNames from "@/utils/generators/names/elf"`
   - Add it to the `generators` map: `elf: ElfNames`

4. The generator will automatically appear in the UI!

## 📝 Documentation

Code is fully documented with JSDoc comments. To view documentation:
- Check generator files in `src/utils/generators/names/`
- See client-side utilities in `src/utils/name-generators.ts`
- Review component documentation in `src/components/name-generator.tsx`

All functions include:
- Parameter descriptions
- Return type documentation
- Usage examples
- Algorithm explanations

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m '✨ Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This is a personal project.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- HeroUI team for UI components
- D&D community for inspiration

---

Made with ❤️ for the D&D community

## 🌐 Languages

- [English](README.md) (Current)
- [فارسی (Persian)](README.fa.md)
