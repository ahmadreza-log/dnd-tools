# 🎲 D&D Tools

A comprehensive toolkit for Dungeons & Dragons players and storytellers, featuring fantasy name generators and other useful utilities.

## ✨ Features

### 🎭 Name Generator
- **Alien Names**: Generate space and alien-sounding names
- **Amazon Names**: Generate Amazonian and warrior names
- **Anansi Names**: Generate Akan/Ghanaian-inspired names from African culture

Each generator includes:
- ✅ Sensitivity filter to prevent inappropriate content
- ✅ Advanced algorithms for natural-sounding name generation
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
│   │   ├── api/
│   │   │   └── names/
│   │   │       └── [type]/     # API endpoint for name generation
│   │   ├── name-generator/     # Name generator page
│   │   ├── dice-roller/        # Dice roller page
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── name-generator.tsx
│   │   ├── dice-roller.tsx
│   │   └── header.tsx
│   └── utils/
│       ├── generators/
│       │   └── names/          # Name generator modules
│       │       ├── alien.ts
│       │       ├── amazon.ts
│       │       └── anansi.ts
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

## 📡 API Endpoints

### Name Generation

```
GET /api/names/[type]
```

**Parameters:**
- `type`: Name type (alien, amazon, anansi)

**Example:**
```bash
GET /api/names/alien
# Response: ["xkrath", "q'varn", "zthul", ...]
```

**Status Codes:**
- `200`: Success - Array of generated names
- `404`: Name type not supported
- `500`: Server error

## 🛠️ Scripts

```bash
npm run dev      # Run development server
npm run build    # Build project for production
npm run start    # Run production server
npm run lint     # Lint code with ESLint
```

## 🎯 Adding a New Name Generator

1. Create a new file in `src/utils/generators/names/`
2. Implement the generator function with the following structure:

```typescript
import SensitivityCheck from "@/utils/sensitivity-check"

const COUNT = 10
const MAX_ATTEMPTS = 1000

const YourNames = (): Response => {
    // Implementation
    const generate = (): string => {
        // Name generation logic
        // Must use SensitivityCheck(name) before returning
    }
    
    const names: string[] = []
    for (let i = 0; i < COUNT; i++) {
        names[i] = generate()
    }
    
    return Response.json(names)
}

export default YourNames
```

3. In `src/app/api/names/[type]/route.tsx`:
   - Import it
   - Add it to the `generators` map

## 📝 Documentation

Code is documented with JSDoc. To view documentation:
- Check generator files in `src/utils/generators/names/`
- See API route in `src/app/api/names/[type]/route.tsx`

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
