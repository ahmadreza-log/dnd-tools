# 🎲 ابزارهای D&D

یک مجموعه ابزار کامل برای بازیکنان و داستان‌نویسان Dungeons & Dragons که شامل تولیدکننده نام‌های فانتزی و ابزارهای مفید دیگر است.

## ✨ ویژگی‌ها

### 🎭 تولیدکننده نام
- **Alien Names**: تولید نام‌های فضایی و بیگانه
- **Amazon Names**: تولید نام‌های آمازونی و جنگجو
- **Anansi Names**: تولید نام‌های آکان/غنایی الهام‌گرفته از فرهنگ آفریقایی

هر تولیدکننده شامل:
- ✅ فیلتر حساسیت برای جلوگیری از محتوای نامناسب
- ✅ الگوریتم‌های پیشرفته برای تولید نام‌های طبیعی
- ✅ مستندات کامل و کد بهینه‌شده

### 🎲 تاس‌انداز
ابزار ساده و کاربردی برای پرتاب تاس‌های D&D

## 🚀 شروع سریع

### پیش‌نیازها
- Node.js 18+
- npm, yarn, pnpm یا bun

### نصب

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

### اجرای پروژه

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

سپس مرورگر را در [http://localhost:3000](http://localhost:3000) باز کنید.

## 📁 ساختار پروژه

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

## 🔧 تکنولوژی‌ها

- **Framework**: [Next.js 16](https://nextjs.org/) با App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: HeroUI (NextUI fork)
- **Animations**: Framer Motion
- **Icons**: React Icons

## 📡 API Endpoints

### تولید نام

```
GET /api/names/[type]
```

**پارامترها:**
- `type`: نوع نام (alien, amazon, anansi)

**مثال:**
```bash
GET /api/names/alien
# Response: ["xkrath", "q'varn", "zthul", ...]
```

**کدهای وضعیت:**
- `200`: موفق - آرایه‌ای از نام‌های تولید شده
- `404`: نوع نام پشتیبانی نمی‌شود
- `500`: خطای سرور

## 🛠️ اسکریپت‌ها

```bash
npm run dev      # اجرای سرور توسعه
npm run build    # ساخت پروژه برای production
npm run start    # اجرای سرور production
npm run lint     # بررسی کد با ESLint
```

## 🎯 افزودن تولیدکننده نام جدید

1. فایل جدید را در `src/utils/generators/names/` ایجاد کنید
2. تابع تولیدکننده را با ساختار زیر پیاده‌سازی کنید:

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

3. در `src/app/api/names/[type]/route.tsx`:
   - Import کنید
   - به `generators` map اضافه کنید

## 📝 مستندات

کدها با JSDoc مستندسازی شده‌اند. برای مشاهده مستندات:
- فایل‌های generator را در `src/utils/generators/names/` بررسی کنید
- API route را در `src/app/api/names/[type]/route.tsx` ببینید

## 🤝 مشارکت

مشارکت‌ها خوش‌آمد هستند! لطفاً:
1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m '✨ Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

## 📄 لایسنس

این پروژه یک پروژه شخصی است.

## 🙏 تشکر

- Next.js team برای فریمورک عالی
- HeroUI team برای کامپوننت‌های UI
- جامعه D&D برای الهام

---

ساخته شده با ❤️ برای جامعه D&D

## 🌐 زبان‌ها

- [English](README.md)
- [فارسی (Persian)](README.fa.md) (فعلی)

