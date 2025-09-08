# 🔍 Pathfinding Algorithms Visualizer | مصورساز الگوریتم‌های مسیریابی

<div align="center">

[![English](https://img.shields.io/badge/Language-English-blue.svg)](#english) [![Persian](https://img.shields.io/badge/Language-Persian-green.svg)](#persian)

An interactive and modern tool for learning and visualizing pathfinding algorithms with bilingual Persian and English language support.

ابزار تعاملی و مدرن برای یادگیری و مصورسازی الگوریتم‌های مسیریابی با پشتیبانی دوزبانه فارسی و انگلیسی.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

</div>

---

## English

### ✨ Features

#### 🎯 Supported Algorithms
- **DFS** - Depth-First Search
- **BFS** - Breadth-First Search
- **UCS** - Uniform Cost Search
- **Greedy** - Greedy Best-First Search
- **A*** - A* Search Algorithm

#### 🌐 International Features
- **Bilingual Support** - Complete Persian and English interface
- **RTL/LTR** - Right-to-left and left-to-right text direction
- **Native Fonts** - Tahoma for Persian, Inter for English

#### 🎮 Interactive Features
- **Live Animation** - Step-by-step algorithm execution visualization
- **Speed Control** - Adjustable animation speed
- **Random Walls** - Generate random obstacles
- **Detailed Statistics** - Execution time, complexity and efficiency metrics
- **Algorithm Comparison** - Compare different algorithm characteristics

#### 🛠️ Technologies
- 🚀 **React Router v7** - Server-side rendering
- ⚡️ **Vite** - Hot Module Replacement (HMR)
- 📦 **TypeScript** - Type safety
- 🎨 **Custom CSS** - Modern styling
- 🌍 **i18n** - Internationalization support

### Getting Started

#### Installation

Install the dependencies:

```bash
npm install
```

#### Development

Start the development server with hot reloading:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173` (or next available port).

#### Building

Create a production build:

```bash
npm run build
```

### Usage

1. **Select Algorithm**: Choose from DFS, BFS, UCS, Greedy, or A*
2. **Set Start/Goal**: Click to place start (green) and goal (red) points
3. **Add Obstacles**: Click and drag to draw walls, or use "Random Walls" button
4. **Configure**: Adjust animation speed and select heuristic for informed algorithms
5. **Visualize**: Click "Play" to watch the algorithm find the path
6. **Analyze**: Review statistics including execution time, nodes visited, and path length

### Algorithm Comparison

| Algorithm | Complete | Optimal | Time Complexity | Space Complexity |
|-----------|----------|---------|----------------|------------------|
| DFS       | ❌       | ❌      | O(b^m)         | O(bm)           |
| BFS       | ✅       | ✅      | O(b^d)         | O(b^d)          |
| UCS       | ✅       | ✅      | O(b^(1+C*/ε)) | O(b^(1+C*/ε))  |
| Greedy    | ❌       | ❌      | O(b^m)         | O(b^m)          |
| A*        | ✅       | ✅      | O(b^d)         | O(b^d)          |

*b = branching factor, d = depth of solution, m = maximum depth, C* = optimal cost, ε = minimum step cost*

---

## Persian

### ✨ ویژگی‌ها

#### 🎯 الگوریتم‌های پشتیبانی شده
- **DFS** - جستجوی عمق-اول
- **BFS** - جستجوی عرض-اول
- **UCS** - جستجوی یکنواخت هزینه
- **Greedy** - جستجوی طمعانه
- **A*** - الگوریتم A ستاره

#### 🌐 ویژگی‌های بین‌المللی
- **پشتیبانی دوزبانه** - رابط کاربری کامل فارسی و انگلیسی
- **RTL/LTR** - پشتیبانی از راست به چپ و چپ به راست
- **فونت‌های بومی** - تاهوما برای فارسی، اینتر برای انگلیسی

#### 🎮 ویژگی‌های تعاملی
- **انیمیشن زنده** - مصورسازی گام به گام اجرای الگوریتم
- **کنترل سرعت** - تنظیم سرعت انیمیشن
- **دیوارهای تصادفی** - تولید موانع تصادفی
- **آمار دقیق** - زمان اجرا، پیچیدگی و معیارهای کارایی
- **مقایسه الگوریتم‌ها** - مقایسه ویژگی‌های مختلف الگوریتم‌ها

#### 🛠️ تکنولوژی‌ها
- 🚀 **React Router v7** - رندر سمت سرور
- ⚡️ **Vite** - بازآوری سریع ماژول‌ها
- 📦 **TypeScript** - امنیت نوع داده
- 🎨 **Custom CSS** - استایل مدرن
- 🌍 **i18n** - پشتیبانی بین‌المللی‌سازی

### شروع کار

#### نصب

نصب وابستگی‌ها:

```bash
npm install
```

#### توسعه

راه‌اندازی سرور توسعه با بازآوری سریع:

```bash
npm run dev
```

برنامه در آدرس `http://localhost:5173` (یا پورت بعدی موجود) در دسترس خواهد بود.

#### ساخت

ایجاد build تولیدی:

```bash
npm run build
```

### نحوه استفاده

1. **انتخاب الگوریتم**: از بین DFS، BFS، UCS، Greedy یا A* انتخاب کنید
2. **تنظیم شروع/هدف**: کلیک کنید تا نقاط شروع (سبز) و هدف (قرمز) را قرار دهید
3. **افزودن موانع**: کلیک و کشیدن برای رسم دیوارها، یا از دکمه "دیوارهای تصادفی" استفاده کنید
4. **پیکربندی**: سرعت انیمیشن را تنظیم کنید و برای الگوریتم‌های آگاه، تابع تخمین انتخاب کنید
5. **مصورسازی**: روی "پخش" کلیک کنید تا الگوریتم مسیر را پیدا کند
6. **تحلیل**: آمارها شامل زمان اجرا، گره‌های بازدید شده و طول مسیر را بررسی کنید

### مقایسه الگوریتم‌ها

| الگوریتم | کامل | بهینه | پیچیدگی زمانی | پیچیدگی مکانی |
|----------|-------|-------|----------------|----------------|
| DFS      | ❌    | ❌    | O(b^m)         | O(bm)          |
| BFS      | ✅    | ✅    | O(b^d)         | O(b^d)         |
| UCS      | ✅    | ✅    | O(b^(1+C*/ε)) | O(b^(1+C*/ε)) |
| Greedy   | ❌    | ❌    | O(b^m)         | O(b^m)         |
| A*       | ✅    | ✅    | O(b^d)         | O(b^d)         |

*b = عامل انشعاب، d = عمق راه‌حل، m = حداکثر عمق، C* = هزینه بهینه، ε = حداقل هزینه گام*

---

## Contributing | مشارکت

### English
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### فارسی
1. مخزن را Fork کنید
2. شاخه ویژگی خود را ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را commit کنید (`git commit -m 'Add some amazing feature'`)
4. به شاخه push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

## License | مجوز

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

این پروژه تحت مجوز MIT منتشر شده است - برای جزئیات فایل [LICENSE](LICENSE) را ببینید.

## Acknowledgments | تشکر و قدردانی

- Built with React Router v7 | ساخته شده با React Router v7
- Inspired by pathfinding algorithm education | الهام گرفته از آموزش الگوریتم‌های مسیریابی
- Supports both Persian and English languages for wider accessibility | پشتیبانی از زبان‌های فارسی و انگلیسی برای دسترسی گسترده‌تر