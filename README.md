# 🔍 Pathfinding Algorithms Visualizer

# ابزار مصورسازی الگوریتم‌های مسیریابی

<div align="center">

[![English](https://img.shields.io/badge/Language-English-blue.svg)](#english) [![Persian](https://img.shields.io/badge/Language-Persian-green.svg)](#persian) [![React Router](https://img.shields.io/badge/React%20Router-v7-blue)](https://reactrouter.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-6.3.3-646CFF)](https://vitejs.dev/)

**A sophisticated educational platform for learning and visualizing pathfinding algorithms with comprehensive bilingual support**

**پلتفرم آموزشی پیشرفته برای یادگیری و مصورسازی الگوریتم‌های مسیریابی با پشتیبانی کامل دوزبانه**

[![Demo](https://img.shields.io/badge/🎮-Live%20Demo-green.svg)](https://malekipourdev.ir/) [![GitHub Stars](https://img.shields.io/github/stars/malekipourdev/ai-app?style=social)](https://github.com/malekipourdev/ai-app)

![Pathfinding Demo](https://via.placeholder.com/800x400/2563eb/ffffff?text=Interactive+Pathfinding+Visualization)

</div>

---

## 📋 Table of Contents | فهرست مطالب

- [English Documentation](#english)
  - [Overview](#overview)
  - [Features](#features)
  - [Algorithms](#algorithms)
  - [Technical Architecture](#technical-architecture)
  - [Installation & Setup](#installation--setup)
  - [Usage Guide](#usage-guide)
  - [Performance Analysis](#performance-analysis)
- [Persian Documentation](#persian)
  - [بررسی کلی](#بررسی-کلی)
  - [ویژگی‌ها](#ویژگی‌ها)
  - [الگوریتم‌ها](#الگوریتم‌ها)
  - [معماری فنی](#معماری-فنی)
  - [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
  - [راهنمای استفاده](#راهنمای-استفاده)
  - [تحلیل عملکرد](#تحلیل-عملکرد)

---

<div id="english">

# 📖 English Documentation

## Overview

The **Pathfinding Algorithms Visualizer** is a comprehensive educational web application designed to help students, developers, and AI enthusiasts understand the fundamental concepts of pathfinding algorithms through interactive visualization. This project combines theoretical computer science knowledge with practical implementation, offering an immersive learning experience.

### Project Scope

This application serves as both an educational tool and a technical demonstration of modern web development practices. It bridges the gap between abstract algorithmic concepts and visual understanding, making complex AI search algorithms accessible to learners at all levels.

## Features

### 🎯 Core Algorithm Implementations

#### **Five Complete Algorithm Implementations:**

- **DFS (Depth-First Search)** - Stack-based exploration strategy
- **BFS (Breadth-First Search)** - Queue-based level-order traversal
- **UCS (Uniform Cost Search)** - Dijkstra's algorithm variant with cost optimization
- **Greedy Best-First Search** - Heuristic-driven exploration
- **A\* Search** - Optimal pathfinding with heuristic guidance

Each algorithm is implemented with full visualization capabilities, showing:

- **Node exploration patterns** in real-time
- **Path reconstruction** from goal to start
- **Performance metrics** and complexity analysis
- **Step-by-step execution** with pause/resume functionality

### 🌐 Advanced Internationalization

#### **Comprehensive Bilingual Support:**

- **Persian (Farsi)** - Complete RTL (Right-to-Left) interface
- **English** - Standard LTR (Left-to-Right) interface
- **Dynamic language switching** without page reload
- **Cultural typography** - Tahoma for Persian, Inter for English
- **Localized terminology** for computer science concepts

### 🎮 Interactive Visualization Features

#### **Real-Time Animation System:**

- **Variable speed control** (10ms to 1000ms intervals)
- **Frame-by-frame stepping** for detailed analysis
- **Play/Pause/Reset** controls with state preservation
- **Visual node states**: Start, Goal, Wall, Visited, Path, Current

#### **Grid Customization:**

- **Dynamic grid sizing** (5x5 to 20x20)
- **Drag-and-drop** start/goal positioning
- **Wall creation** via click-and-drag
- **Random obstacle generation** with density control
- **Grid reset** with configuration preservation

### 📊 Comprehensive Analytics

#### **Performance Metrics:**

- **Execution time** measurement in milliseconds
- **Nodes visited** count with efficiency ratios
- **Path length** optimization analysis
- **Memory usage** estimation
- **Algorithm comparison** side-by-side

#### **Educational Statistics:**

- **Complexity analysis** (Time and Space)
- **Optimality guarantees** verification
- **Completeness assessment**
- **Heuristic function** comparison

### 🛠️ Technical Architecture

#### **Modern Web Stack:**

- **React Router v7** - Server-side rendering with hydration
- **TypeScript 5.8.3** - Full type safety and IntelliSense
- **Vite 6.3.3** - Lightning-fast build tool with HMR
- **Custom CSS** - Modern responsive design without frameworks
- **Node.js** - Development and build environment

#### **Code Organization:**

```
app/
├── algorithms/          # Core pathfinding implementations
├── components/          # Reusable UI components
├── i18n/               # Internationalization system
├── routes/             # Page routing and layouts
├── utils/              # Helper functions and utilities
└── welcome/            # Landing page assets
```

## Algorithms

### Detailed Algorithm Analysis

#### 1. **Depth-First Search (DFS)**

```typescript
// Stack-based implementation
export const dfs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const stack: NodeType[] = [startNode];
  // ... implementation details
};
```

- **Characteristics**: Explores deep before wide
- **Completeness**: ❌ Not complete in infinite spaces
- **Optimality**: ❌ Does not guarantee shortest path
- **Time Complexity**: O(b^m) where b=branching factor, m=maximum depth
- **Space Complexity**: O(bm) - linear space
- **Best Use Case**: Memory-constrained environments

#### 2. **Breadth-First Search (BFS)**

```typescript
// Queue-based implementation with guaranteed optimality
export const bfs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const queue: NodeType[] = [startNode];
  // ... implementation details
};
```

- **Characteristics**: Explores level by level
- **Completeness**: ✅ Complete
- **Optimality**: ✅ Optimal for unweighted graphs
- **Time Complexity**: O(b^d) where d=depth of solution
- **Space Complexity**: O(b^d) - exponential space
- **Best Use Case**: Finding shortest path in unweighted graphs

#### 3. **Uniform Cost Search (UCS)**

```typescript
// Priority queue with cost optimization
export const ucs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const unvisited: NodeType[] = [];
  // Dijkstra's algorithm implementation
};
```

- **Characteristics**: Explores lowest-cost nodes first
- **Completeness**: ✅ Complete
- **Optimality**: ✅ Optimal for weighted graphs
- **Time Complexity**: O(b^(1+C*/ε)) where C*=optimal cost, ε=minimum cost
- **Space Complexity**: O(b^(1+C\*/ε))
- **Best Use Case**: Weighted graphs with varying edge costs

#### 4. **Greedy Best-First Search**

```typescript
// Heuristic-driven exploration
export const greedy: AlgorithmFunction = (
  grid,
  startNode,
  endNode,
  heuristic
) => {
  // Sorts by heuristic distance to goal
  unvisited.sort((a, b) => {
    const hA = getHeuristicDistance(a, endNode, heuristic);
    const hB = getHeuristicDistance(b, endNode, heuristic);
    return hA - hB;
  });
};
```

- **Characteristics**: Uses heuristic to guide search
- **Completeness**: ❌ Not complete
- **Optimality**: ❌ Not optimal
- **Time Complexity**: O(b^m) - worst case
- **Space Complexity**: O(b^m)
- **Best Use Case**: Quick approximate solutions

#### 5. **A\* Search Algorithm**

```typescript
// Optimal heuristic search
export const astar: AlgorithmFunction = (
  grid,
  startNode,
  endNode,
  heuristic
) => {
  // f(n) = g(n) + h(n) evaluation
  neighbor.fScore =
    neighbor.gScore + getHeuristicDistance(neighbor, endNode, heuristic);
};
```

- **Characteristics**: Combines UCS and Greedy approaches
- **Completeness**: ✅ Complete
- **Optimality**: ✅ Optimal with admissible heuristic
- **Time Complexity**: O(b^d) - with good heuristic
- **Space Complexity**: O(b^d)
- **Best Use Case**: Most practical pathfinding scenarios

### Heuristic Functions

The application implements three heuristic functions:

1. **Manhattan Distance**: `|x₁-x₂| + |y₁-y₂|`
2. **Euclidean Distance**: `√[(x₁-x₂)² + (y₁-y₂)²]`
3. **Diagonal Distance**: `max(|x₁-x₂|, |y₁-y₂|)`

## Installation & Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** for version control

### Quick Start

```bash
# Clone the repository
git clone https://github.com/malekipourdev/ai-app.git
cd ai-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Environment

```bash
# Type checking
npm run typecheck

# Development with hot reload
npm run dev
```

Your application will be available at `http://localhost:5173`

### Docker Support

```dockerfile
# Build Docker image
docker build -t pathfinding-visualizer .

# Run container
docker run -p 5173:5173 pathfinding-visualizer
```

## Usage Guide

### Basic Operations

1. **Algorithm Selection**

   - Choose from dropdown: DFS, BFS, UCS, Greedy, A\*
   - Select heuristic for informed algorithms
   - Adjust animation speed (10ms - 1000ms)

2. **Grid Configuration**

   - Set grid size (5x5 to 20x20)
   - Drag green node (start position)
   - Drag red node (goal position)
   - Click/drag to create walls

3. **Visualization Control**

   - Click "Play" to start animation
   - "Pause" to stop at current step
   - "Reset" to clear visualization
   - "Random Walls" for obstacle generation

4. **Analysis**
   - Monitor real-time statistics
   - Compare algorithm performance
   - Study path optimality

### Advanced Features

#### Custom Grid Patterns

Create specific test scenarios:

- **Maze patterns** - Complex wall structures
- **Open spaces** - Minimal obstacles
- **Narrow corridors** - Bottleneck testing
- **Multiple paths** - Alternative route analysis

#### Performance Benchmarking

Compare algorithms across:

- **Different grid sizes**
- **Various obstacle densities**
- **Multiple heuristic functions**
- **Start/goal distances**

## Performance Analysis

### Algorithm Comparison Matrix

| Algorithm  | Complete | Optimal | Best Time | Best Space | Use Case            |
| ---------- | -------- | ------- | --------- | ---------- | ------------------- |
| **DFS**    | ❌       | ❌      | O(b^m)    | O(bm)      | Memory-limited      |
| **BFS**    | ✅       | ✅\*    | O(b^d)    | O(b^d)     | Unweighted graphs   |
| **UCS**    | ✅       | ✅      | O(b^C\*)  | O(b^C\*)   | Weighted graphs     |
| **Greedy** | ❌       | ❌      | O(b^m)    | O(b^m)     | Quick approximation |
| **A\***    | ✅       | ✅      | O(b^d)    | O(b^d)     | General pathfinding |

_\* Optimal for unweighted graphs_

### Experimental Results

Based on empirical testing within the application:

#### Small Grids (5x5 to 10x10)

- **A\*** consistently finds optimal paths fastest
- **BFS** guarantees optimality with higher memory usage
- **Greedy** provides quick approximate solutions
- **DFS** may get trapped in poor paths

#### Large Grids (15x15 to 20x20)

- **A\*** maintains superiority with good heuristics
- **UCS** becomes more relevant with varied costs
- **Memory constraints** favor DFS in extreme cases
- **Animation speed** affects user experience significantly

</div>

---

<div id="persian">

# 📖 مستندات فارسی

## بررسی کلی

**ابزار مصورسازی الگوریتم‌های مسیریابی** یک برنامه وب آموزشی جامع است که برای کمک به دانشجویان، توسعه‌دهندگان و علاقه‌مندان به هوش مصنوعی طراحی شده تا مفاهیم بنیادی الگوریتم‌های مسیریابی را از طریق مصورسازی تعاملی درک کنند. این پروژه دانش نظری علوم کامپیوتر را با پیاده‌سازی عملی ترکیب می‌کند و تجربه یادگیری غوطه‌وری ارائه می‌دهد.

### حوزه پروژه

این برنامه هم به عنوان ابزار آموزشی و هم به عنوان نمایش فنی شیوه‌های مدرن توسعه وب عمل می‌کند. این برنامه شکاف بین مفاهیم الگوریتمی انتزاعی و درک بصری را پر می‌کند و الگوریتم‌های پیچیده جستجوی هوش مصنوعی را برای یادگیرندگان در تمام سطوح قابل دسترس می‌سازد.

## ویژگی‌ها

### 🎯 پیاده‌سازی‌های اصلی الگوریتم

#### **پنج پیاده‌سازی کامل الگوریتم:**

- **DFS (جستجوی عمق-اول)** - استراتژی اکتشاف مبتنی بر پشته
- **BFS (جستجوی عرض-اول)** - پیمایش سطحی مبتنی بر صف
- **UCS (جستجوی یکنواخت هزینه)** - نوعی از الگوریتم دایکسترا با بهینه‌سازی هزینه
- **جستجوی طمعانه بهترین-اول** - اکتشاف هدایت‌شده با اکتشافی
- **جستجوی A\*** - مسیریابی بهینه با راهنمایی اکتشافی

هر الگوریتم با قابلیت‌های کامل مصورسازی پیاده‌سازی شده و نشان می‌دهد:

- **الگوهای اکتشاف گره** در زمان واقعی
- **بازسازی مسیر** از هدف تا شروع
- **معیارهای عملکرد** و تحلیل پیچیدگی
- **اجرای گام‌به‌گام** با قابلیت توقف/ادامه

### 🌐 بین‌المللی‌سازی پیشرفته

#### **پشتیبانی جامع دوزبانه:**

- **فارسی** - رابط کامل RTL (راست به چپ)
- **انگلیسی** - رابط استاندارد LTR (چپ به راست)
- **تغییر زبان پویا** بدون بارگذاری مجدد صفحه
- **تایپوگرافی فرهنگی** - تاهوما برای فارسی، اینتر برای انگلیسی
- **اصطلاحات محلی‌سازی شده** برای مفاهیم علوم کامپیوتر

### 🎮 ویژگی‌های مصورسازی تعاملی

#### **سیستم انیمیشن زمان واقعی:**

- **کنترل سرعت متغیر** (فواصل 10 تا 1000 میلی‌ثانیه)
- **گام‌بندی فریم‌به‌فریم** برای تحلیل دقیق
- **کنترل‌های پخش/توقف/تنظیم مجدد** با حفظ وضعیت
- **وضعیت‌های بصری گره**: شروع، هدف، دیوار، بازدید شده، مسیر، فعلی

#### **سفارشی‌سازی شبکه:**

- **اندازه‌گیری پویا شبکه** (5×5 تا 20×20)
- **موقعیت‌یابی کشیدن و رها کردن** شروع/هدف
- **ایجاد دیوار** از طریق کلیک و کشیدن
- **تولید موانع تصادفی** با کنترل تراکم
- **تنظیم مجدد شبکه** با حفظ پیکربندی

### 📊 تحلیل‌های جامع

#### **معیارهای عملکرد:**

- **اندازه‌گیری زمان اجرا** بر حسب میلی‌ثانیه
- **شمارش گره‌های بازدید شده** با نسبت‌های کارایی
- **تحلیل بهینه‌سازی طول مسیر**
- **تخمین استفاده از حافظه**
- **مقایسه الگوریتم** کنار هم

#### **آمار آموزشی:**

- **تحلیل پیچیدگی** (زمان و مکان)
- **تأیید تضمین‌های بهینگی**
- **ارزیابی کاملیت**
- **مقایسه تابع اکتشافی**

### 🛠️ معماری فنی

#### **پشته وب مدرن:**

- **React Router v7** - رندر سمت سرور با هیدراسیون
- **TypeScript 5.8.3** - امنیت کامل نوع و IntelliSense
- **Vite 6.3.3** - ابزار ساخت فوق‌سریع با HMR
- **CSS سفارشی** - طراحی واکنش‌گرا مدرن بدون فریم‌ورک
- **Node.js** - محیط توسعه و ساخت

#### **سازمان‌دهی کد:**

```
app/
├── algorithms/          # پیاده‌سازی‌های اصلی مسیریابی
├── components/          # اجزای قابل استفاده مجدد UI
├── i18n/               # سیستم بین‌المللی‌سازی
├── routes/             # مسیریابی صفحه و چیدمان‌ها
├── utils/              # توابع کمکی و ابزارها
└── welcome/            # دارایی‌های صفحه فرود
```

## الگوریتم‌ها

### تحلیل دقیق الگوریتم

#### 1. **جستجوی عمق-اول (DFS)**

```typescript
// پیاده‌سازی مبتنی بر پشته
export const dfs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const stack: NodeType[] = [startNode];
  // ... جزئیات پیاده‌سازی
};
```

- **ویژگی‌ها**: عمق را قبل از عرض اکتشاف می‌کند
- **کاملیت**: ❌ در فضاهای نامحدود کامل نیست
- **بهینگی**: ❌ کوتاه‌ترین مسیر را تضمین نمی‌کند
- **پیچیدگی زمانی**: O(b^m) که b=ضریب انشعاب، m=حداکثر عمق
- **پیچیدگی مکانی**: O(bm) - فضای خطی
- **بهترین مورد استفاده**: محیط‌های محدود حافظه

#### 2. **جستجوی عرض-اول (BFS)**

```typescript
// پیاده‌سازی مبتنی بر صف با تضمین بهینگی
export const bfs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const queue: NodeType[] = [startNode];
  // ... جزئیات پیاده‌سازی
};
```

- **ویژگی‌ها**: سطح به سطح اکتشاف می‌کند
- **کاملیت**: ✅ کامل
- **بهینگی**: ✅ برای گراف‌های بدون وزن بهینه
- **پیچیدگی زمانی**: O(b^d) که d=عمق راه‌حل
- **پیچیدگی مکانی**: O(b^d) - فضای نمایی
- **بهترین مورد استفاده**: یافتن کوتاه‌ترین مسیر در گراف‌های بدون وزن

#### 3. **جستجوی یکنواخت هزینه (UCS)**

```typescript
// صف اولویت با بهینه‌سازی هزینه
export const ucs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const unvisited: NodeType[] = [];
  // پیاده‌سازی الگوریتم دایکسترا
};
```

- **ویژگی‌ها**: ابتدا گره‌های کم‌هزینه را اکتشاف می‌کند
- **کاملیت**: ✅ کامل
- **بهینگی**: ✅ برای گراف‌های وزن‌دار بهینه
- **پیچیدگی زمانی**: O(b^(1+C*/ε)) که C*=هزینه بهینه، ε=حداقل هزینه
- **پیچیدگی مکانی**: O(b^(1+C\*/ε))
- **بهترین مورد استفاده**: گراف‌های وزن‌دار با هزینه‌های متغیر یال

#### 4. **جستجوی طمعانه بهترین-اول**

```typescript
// اکتشاف هدایت‌شده با اکتشافی
export const greedy: AlgorithmFunction = (
  grid,
  startNode,
  endNode,
  heuristic
) => {
  // مرتب‌سازی بر اساس فاصله اکتشافی تا هدف
  unvisited.sort((a, b) => {
    const hA = getHeuristicDistance(a, endNode, heuristic);
    const hB = getHeuristicDistance(b, endNode, heuristic);
    return hA - hB;
  });
};
```

- **ویژگی‌ها**: از اکتشافی برای هدایت جستجو استفاده می‌کند
- **کاملیت**: ❌ کامل نیست
- **بهینگی**: ❌ بهینه نیست
- **پیچیدگی زمانی**: O(b^m) - بدترین حالت
- **پیچیدگی مکانی**: O(b^m)
- **بهترین مورد استفاده**: راه‌حل‌های تقریبی سریع

#### 5. **الگوریتم جستجوی A\***

```typescript
// جستجوی اکتشافی بهینه
export const astar: AlgorithmFunction = (
  grid,
  startNode,
  endNode,
  heuristic
) => {
  // ارزیابی f(n) = g(n) + h(n)
  neighbor.fScore =
    neighbor.gScore + getHeuristicDistance(neighbor, endNode, heuristic);
};
```

- **ویژگی‌ها**: رویکردهای UCS و طمعانه را ترکیب می‌کند
- **کاملیت**: ✅ کامل
- **بهینگی**: ✅ با اکتشافی قابل قبول بهینه
- **پیچیدگی زمانی**: O(b^d) - با اکتشافی خوب
- **پیچیدگی مکانی**: O(b^d)
- **بهترین مورد استفاده**: بیشتر سناریوهای عملی مسیریابی

### توابع اکتشافی

برنامه سه تابع اکتشافی پیاده‌سازی می‌کند:

1. **فاصله منهتن**: `|x₁-x₂| + |y₁-y₂|`
2. **فاصله اقلیدسی**: `√[(x₁-x₂)² + (y₁-y₂)²]`
3. **فاصله قطری**: `max(|x₁-x₂|, |y₁-y₂|)`

## نصب و راه‌اندازی

### پیش‌نیازها

- **Node.js** نسخه 18.0.0 یا بالاتر
- **npm** نسخه 8.0.0 یا بالاتر
- **Git** برای کنترل نسخه

### شروع سریع

```bash
# کلون مخزن
git clone https://github.com/malekipourdev/ai-app.git
cd ai-app

# نصب وابستگی‌ها
npm install

# شروع سرور توسعه
npm run dev

# ساخت برای تولید
npm run build

# شروع سرور تولید
npm start
```

### محیط توسعه

```bash
# بررسی نوع
npm run typecheck

# توسعه با بارگذاری سریع
npm run dev
```

برنامه شما در `http://localhost:5173` در دسترس خواهد بود

### پشتیبانی Docker

```dockerfile
# ساخت تصویر Docker
docker build -t pathfinding-visualizer .

# اجرای کانتینر
docker run -p 5173:5173 pathfinding-visualizer
```

## راهنمای استفاده

### عملیات اساسی

1. **انتخاب الگوریتم**

   - از منوی کشویی انتخاب کنید: DFS، BFS، UCS، طمعانه، A\*
   - برای الگوریتم‌های آگاه اکتشافی انتخاب کنید
   - سرعت انیمیشن را تنظیم کنید (10-1000 میلی‌ثانیه)

2. **پیکربندی شبکه**

   - اندازه شبکه را تنظیم کنید (5×5 تا 20×20)
   - گره سبز را بکشید (موقعیت شروع)
   - گره قرمز را بکشید (موقعیت هدف)
   - برای ایجاد دیوار کلیک/بکشید

3. **کنترل مصورسازی**

   - روی "پخش" کلیک کنید تا انیمیشن شروع شود
   - "توقف" برای متوقف کردن در گام فعلی
   - "تنظیم مجدد" برای پاک کردن مصورسازی
   - "دیوارهای تصادفی" برای تولید موانع

4. **تحلیل**
   - آمار زمان واقعی را نظارت کنید
   - عملکرد الگوریتم را مقایسه کنید
   - بهینگی مسیر را مطالعه کنید

### ویژگی‌های پیشرفته

#### الگوهای شبکه سفارشی

سناریوهای تست خاص ایجاد کنید:

- **الگوهای پیچ‌در‌پیچ** - ساختارهای پیچیده دیوار
- **فضاهای باز** - موانع حداقل
- **راهروهای باریک** - آزمون گلوگاه
- **مسیرهای متعدد** - تحلیل مسیر جایگزین

#### معیارسنجی عملکرد

الگوریتم‌ها را در موارد زیر مقایسه کنید:

- **اندازه‌های مختلف شبکه**
- **تراکم‌های مختلف موانع**
- **توابع اکتشافی متعدد**
- **فاصله‌های شروع/هدف**

## تحلیل عملکرد

### ماتریس مقایسه الگوریتم

| الگوریتم   | کامل | بهینه | بهترین زمان | بهترین مکان | مورد استفاده      |
| ---------- | ---- | ----- | ----------- | ----------- | ----------------- |
| **DFS**    | ❌   | ❌    | O(b^m)      | O(bm)       | محدود حافظه       |
| **BFS**    | ✅   | ✅\*  | O(b^d)      | O(b^d)      | گراف‌های بدون وزن |
| **UCS**    | ✅   | ✅    | O(b^C\*)    | O(b^C\*)    | گراف‌های وزن‌دار  |
| **طمعانه** | ❌   | ❌    | O(b^m)      | O(b^m)      | تقریب سریع        |
| **A\***    | ✅   | ✅    | O(b^d)      | O(b^d)      | مسیریابی عمومی    |

_\* برای گراف‌های بدون وزن بهینه_

### نتایج تجربی

بر اساس آزمایش تجربی در برنامه:

#### شبکه‌های کوچک (5×5 تا 10×10)

- **A\*** به طور مداوم مسیرهای بهینه را سریع‌تر پیدا می‌کند
- **BFS** بهینگی را با استفاده بالاتر از حافظه تضمین می‌کند
- **طمعانه** راه‌حل‌های تقریبی سریع ارائه می‌دهد
- **DFS** ممکن است در مسیرهای ضعیف گیر کند

#### شبکه‌های بزرگ (15×15 تا 20×20)

- **A\*** با اکتشافی‌های خوب برتری حفظ می‌کند
- **UCS** با هزینه‌های متنوع مرتبط‌تر می‌شود
- **محدودیت‌های حافظه** در موارد شدید DFS را ترجیح می‌دهد
- **سرعت انیمیشن** به طور قابل توجهی بر تجربه کاربر تأثیر می‌گذارد

</div>

---

## Contributing | مشارکت

### English

We welcome contributions to improve this educational tool! Here's how you can contribute:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

#### Areas for Contribution:

- 🔧 **Algorithm Implementations** - Add new pathfinding algorithms
- 🎨 **UI/UX Improvements** - Enhanced user interface design
- 📚 **Documentation** - Improve or translate documentation
- 🐛 **Bug Fixes** - Report and fix issues
- 🌐 **Internationalization** - Add support for more languages
- 📱 **Mobile Optimization** - Improve mobile experience

### فارسی

ما از مشارکت‌ها برای بهبود این ابزار آموزشی استقبال می‌کنیم! در اینجا نحوه مشارکت شما آمده است:

1. مخزن را **Fork** کنید
2. شاخه ویژگی خود را **ایجاد** کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را **Commit** کنید (`git commit -m 'Add amazing feature'`)
4. به شاخه **Push** کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request **باز** کنید

#### زمینه‌های مشارکت:

- 🔧 **پیاده‌سازی الگوریتم** - افزودن الگوریتم‌های جدید مسیریابی
- 🎨 **بهبود UI/UX** - طراحی بهبود یافته رابط کاربری
- 📚 **مستندسازی** - بهبود یا ترجمه مستندات
- 🐛 **رفع باگ** - گزارش و رفع مسائل
- 🌐 **بین‌المللی‌سازی** - افزودن پشتیبانی برای زبان‌های بیشتر
- 📱 **بهینه‌سازی موبایل** - بهبود تجربه موبایل

---

## License | مجوز

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

این پروژه تحت **مجوز MIT** منتشر شده است - برای جزئیات فایل [LICENSE](LICENSE) را ببینید.

---

## Acknowledgments | قدردانی

### English

- **React Router Team** for the excellent routing framework
- **TypeScript Team** for type safety and developer experience
- **Vite Team** for the lightning-fast build tool
- **Open Source Community** for inspiration and best practices

### فارسی

- **تیم React Router** برای فریم‌ورک مسیریابی عالی
- **تیم TypeScript** برای امنیت نوع و تجربه توسعه‌دهنده
- **تیم Vite** برای ابزار ساخت فوق‌سریع
- **جامعه متن‌باز** برای الهام و بهترین شیوه‌ها

---

<div align="center">

**Made with ❤️ for education and learning**

**با ❤️ برای آموزش و یادگیری ساخته شده**

[![GitHub](https://img.shields.io/badge/GitHub-malekipourdev-black?logo=github)](https://github.com/malekipourdev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

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

1. **Select Algorithm**: Choose from DFS, BFS, UCS, Greedy, or A\*
2. **Set Start/Goal**: Click to place start (green) and goal (red) points
3. **Add Obstacles**: Click and drag to draw walls, or use "Random Walls" button
4. **Configure**: Adjust animation speed and select heuristic for informed algorithms
5. **Visualize**: Click "Play" to watch the algorithm find the path
6. **Analyze**: Review statistics including execution time, nodes visited, and path length

### Algorithm Comparison

| Algorithm | Complete | Optimal | Time Complexity | Space Complexity |
| --------- | -------- | ------- | --------------- | ---------------- |
| DFS       | ❌       | ❌      | O(b^m)          | O(bm)            |
| BFS       | ✅       | ✅      | O(b^d)          | O(b^d)           |
| UCS       | ✅       | ✅      | O(b^(1+C\*/ε))  | O(b^(1+C\*/ε))   |
| Greedy    | ❌       | ❌      | O(b^m)          | O(b^m)           |
| A\*       | ✅       | ✅      | O(b^d)          | O(b^d)           |

_b = branching factor, d = depth of solution, m = maximum depth, C_ = optimal cost, ε = minimum step cost\*

---

## Persian

### ✨ ویژگی‌ها

#### 🎯 الگوریتم‌های پشتیبانی شده

- **DFS** - جستجوی عمق-اول
- **BFS** - جستجوی عرض-اول
- **UCS** - جستجوی یکنواخت هزینه
- **Greedy** - جستجوی طمعانه
- **A\*** - الگوریتم A ستاره

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

1. **انتخاب الگوریتم**: از بین DFS، BFS، UCS، Greedy یا A\* انتخاب کنید
2. **تنظیم شروع/هدف**: کلیک کنید تا نقاط شروع (سبز) و هدف (قرمز) را قرار دهید
3. **افزودن موانع**: کلیک و کشیدن برای رسم دیوارها، یا از دکمه "دیوارهای تصادفی" استفاده کنید
4. **پیکربندی**: سرعت انیمیشن را تنظیم کنید و برای الگوریتم‌های آگاه، تابع تخمین انتخاب کنید
5. **مصورسازی**: روی "پخش" کلیک کنید تا الگوریتم مسیر را پیدا کند
6. **تحلیل**: آمارها شامل زمان اجرا، گره‌های بازدید شده و طول مسیر را بررسی کنید

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
