export type Language = "en" | "fa";

export interface Translations {
  // Header
  title: string;
  subtitle: string;

  // How to Use section
  howToUse: string;
  clickToToggle: string;
  dragGreenNode: string;
  dragRedNode: string;

  // Controls
  algorithm: string;
  algorithmControls: string;
  selectAlgorithm: string;
  play: string;
  reset: string;
  randomWalls: string;
  speed: string;
  gridSize: string;
  heuristic: string;

  // Algorithms
  dfs: string;
  bfs: string;
  ucs: string;
  greedy: string;
  astar: string;

  // Heuristics
  manhattan: string;
  euclidean: string;

  // Stats
  stats: string;
  nodesVisited: string;
  pathLength: string;
  executionTime: string;
  currentStep: string;
  totalSteps: string;
  isComplete: string;

  // Additional Stats
  nodesExplored: string;
  totalNodesExamined: string;
  efficiencyRatio: string;
  pathLengthOverNodesExplored: string;
  algorithmRuntime: string;
  readyToStartPathfinding: string;
  algorithmCharacteristics: string;
  complete: string;
  optimal: string;
  timeComplexity: string;
  spaceComplexity: string;
  yes: string;
  no: string;
  maybe: string;
  unknown: string;
  unknownAlgorithm: string;

  // Legend
  legend: string;

  // Node types
  start: string;
  goal: string;
  wall: string;
  path: string;
  visited: string;
  empty: string;

  // Actions
  startPathfinding: string;
  clearAll: string;

  // Messages
  pathFound: string;
  noPathFound: string;
  clickToStart: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: "Pathfinding Visualizer",
    subtitle:
      "Visualize different pathfinding algorithms in action and compare their performance",

    // How to Use section
    howToUse: "How to Use",
    clickToToggle: "Click to toggle walls (obstacles)",
    dragGreenNode: "Drag green node to move start position",
    dragRedNode: "Drag red node to move goal position",

    // Controls
    algorithm: "Algorithm",
    algorithmControls: "Algorithm Controls",
    selectAlgorithm: "Select Algorithm",
    play: "Play",
    reset: "Reset",
    randomWalls: "Random Walls",
    speed: "Speed",
    gridSize: "Grid Size",
    heuristic: "Heuristic",

    // Algorithms
    dfs: "Depth-First Search (DFS)",
    bfs: "Breadth-First Search (BFS)",
    ucs: "Uniform Cost Search (UCS)",
    greedy: "Greedy Best-First",
    astar: "A* Search",

    // Heuristics
    manhattan: "Manhattan Distance",
    euclidean: "Euclidean Distance",

    // Stats
    stats: "Statistics",
    nodesVisited: "Nodes Visited",
    pathLength: "Path Length",
    executionTime: "Execution Time",
    currentStep: "Current Step",
    totalSteps: "Total Steps",
    isComplete: "Complete",

    // Additional Stats
    nodesExplored: "Nodes Explored",
    totalNodesExamined: "Total nodes examined",
    efficiencyRatio: "Efficiency Ratio",
    pathLengthOverNodesExplored: "Path length / nodes explored",
    algorithmRuntime: "Algorithm runtime",
    readyToStartPathfinding: "Ready to start pathfinding",
    algorithmCharacteristics: "Algorithm Characteristics",
    complete: "Complete",
    optimal: "Optimal",
    timeComplexity: "Time Complexity",
    spaceComplexity: "Space Complexity",
    yes: "Yes",
    no: "No",
    maybe: "Maybe",
    unknown: "Unknown",
    unknownAlgorithm: "Unknown Algorithm",

    // Legend
    legend: "Legend",

    // Node types
    start: "Start",
    goal: "Goal",
    wall: "Wall",
    path: "Path",
    visited: "Visited",
    empty: "Empty",

    // Actions
    startPathfinding: "Start pathfinding animation",
    clearAll: "Clear all animation and start over",

    // Messages
    pathFound: "Path found!",
    noPathFound: "No path found!",
    clickToStart: "Click Play to start visualization",
  },

  fa: {
    // Header
    title: "نمایش‌گر الگوریتم‌های مسیریابی",
    subtitle:
      "الگوریتم‌های مختلف مسیریابی را مشاهده کنید و عملکرد آن‌ها را مقایسه کنید",

    // How to Use section
    howToUse: "نحوه استفاده",
    clickToToggle: "کلیک کنید تا دیوار (مانع) اضافه یا حذف کنید",
    dragGreenNode: "گره سبز را بکشید تا موقعیت شروع را تغییر دهید",
    dragRedNode: "گره قرمز را بکشید تا موقعیت هدف را تغییر دهید",

    // Controls
    algorithm: "الگوریتم",
    algorithmControls: "کنترل‌های الگوریتم",
    selectAlgorithm: "انتخاب الگوریتم",
    play: "اجرا",
    reset: "ریست",
    randomWalls: "دیوارهای تصادفی",
    speed: "سرعت",
    gridSize: "اندازه شبکه",
    heuristic: "روش تخمین",

    // Algorithms
    // dfs: "جستجوی عمق اول (DFS)",
    // bfs: "جستجوی سطح اول (BFS)",
    // ucs: "جستجوی کمترین هزینه (UCS)",
    // greedy: "جستجوی حریصانه",
    // astar: "جستجوی A*",
    dfs: "Depth-First Search (DFS)",
    bfs: "Breadth-First Search (BFS)",
    ucs: "Uniform Cost Search (UCS)",
    greedy: "Greedy Best-First",
    astar: "A* Search",

    // Heuristics
    manhattan: "فاصله منهتن",
    euclidean: "فاصله اقلیدسی",

    // Stats
    stats: "آمار",
    nodesVisited: "گره‌های بازدید شده",
    pathLength: "طول مسیر",
    executionTime: "زمان اجرا",
    currentStep: "قدم فعلی",
    totalSteps: "کل قدم‌ها",
    isComplete: "تکمیل شده",

    // Additional Stats
    nodesExplored: "گره‌های بررسی شده",
    totalNodesExamined: "کل گره‌های بررسی شده",
    efficiencyRatio: "نسبت کارایی",
    pathLengthOverNodesExplored: "طول مسیر / گره‌های بررسی شده",
    algorithmRuntime: "زمان اجرای الگوریتم",
    readyToStartPathfinding: "آماده برای شروع مسیریابی",
    algorithmCharacteristics: "ویژگی‌های الگوریتم",
    complete: "کامل",
    optimal: "بهینه",
    timeComplexity: "پیچیدگی زمانی",
    spaceComplexity: "پیچیدگی مکانی",
    yes: "بله",
    no: "خیر",
    maybe: "شاید",
    unknown: "نامشخص",
    unknownAlgorithm: "الگوریتم نامشخص",

    // Legend
    legend: "راهنما",

    // Node types
    start: "شروع",
    goal: "هدف",
    wall: "دیوار",
    path: "مسیر",
    visited: "بازدید شده",
    empty: "خالی",

    // Actions
    startPathfinding: "شروع انیمیشن مسیریابی",
    clearAll: "پاک کردن همه و شروع مجدد",

    // Messages
    pathFound: "مسیر پیدا شد!",
    noPathFound: "مسیری پیدا نشد!",
    clickToStart: "برای شروع نمایش روی اجرا کلیک کنید",
  },
};
