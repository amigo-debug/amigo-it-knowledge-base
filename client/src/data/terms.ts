/**
 * Amigo IT 知識庫術語數據
 * 自動更新於：2026-04-28
 */

export interface Term {
  id: string;
  en: string;
  zh: string;
  cat: string;
  catLabel: string;
  catIcon: string;
  desc: string;
  analogy: string;
  tags: string[];
}

export const TERMS: Term[] = [
  // ─── 系統架構 ───────────────────────────────────────────────────────────
  {
    id: "rest-api",
    en: "REST API",
    zh: "REST 應用程式介面",
    cat: "architecture",
    catLabel: "系統架構",
    catIcon: "🏗️",
    desc: "一種網絡通信方式，用 HTTP 方法（GET、POST、PUT、DELETE）同伺服器交換數據。就好似你去餐廳叫餐，用唔同嘅手勢表達你想要乜野。",
    analogy: "就好似院舍嘅值班護士，你用電話（GET 查詢）問佢院友情況，或者用紙條（POST 提交）要求佢記錄新資料。",
    tags: ["API", "網絡通信", "院友資料管理平台"],
  },
  {
    id: "api-endpoint",
    en: "API Endpoint",
    zh: "API 端點",
    cat: "architecture",
    catLabel: "系統架構",
    catIcon: "🏗️",
    desc: "API 嘅具體地址，就好似一個郵箱地址。你向呢個地址發送請求，伺服器就會回應。",
    analogy: "就好似院舍嘅不同房間有唔同嘅電話分機，你要撥對分機號碼先至搵到對應嘅人。",
    tags: ["API", "網址", "院友資料管理平台"],
  },
  {
    id: "sync-api",
    en: "Sync API",
    zh: "同步 API",
    cat: "architecture",
    catLabel: "系統架構",
    catIcon: "🏗️",
    desc: "用嚟同步兩個系統嘅數據。例如院友資料管理平台同報餐系統之間，通過 Sync API 定時交換院友資料，確保兩邊資訊一致。",
    analogy: "就好似院舍嘅護理部同廚房之間定時互相通知院友嘅飲食限制，確保廚房知道邊啲院友唔可以食乜野。",
    tags: ["API", "數據同步", "院友資料管理平台", "報餐系統"],
  },
  // ─── 登入與安全 ───────────────────────────────────────────────────────────
  {
    id: "api-key",
    en: "API Key",
    zh: "API 密鑰",
    cat: "auth",
    catLabel: "登入與安全",
    catIcon: "🔐",
    desc: "一串密碼，用嚟證明你有權限使用某個 API。就好似你去銀行提款要出示身份證，API Key 就係系統嘅身份證。",
    analogy: "就好似院舍嘅員工卡，只有持有有效員工卡嘅人先至可以進入院舍同使用系統。",
    tags: ["認證", "安全", "院友資料管理平台"],
  },
  {
    id: "x-api-key",
    en: "X-Api-Key",
    zh: "X-Api-Key 請求頭",
    cat: "auth",
    catLabel: "登入與安全",
    catIcon: "🔐",
    desc: "HTTP 請求嘅一部分，用嚟傳送 API Key。格式係 `X-Api-Key: <你嘅密鑰>`。系統會檢查呢個密鑰係咪正確，先至畀你使用 API。",
    analogy: "就好似院舍嘅訪客登記簿，訪客要寫低自己嘅名字同身份，保安先至知道你係邊個。",
    tags: ["認證", "HTTP", "院友資料管理平台"],
  },
  // ─── 網絡 ───────────────────────────────────────────────────────────────
  {
    id: "http-header",
    en: "HTTP Header",
    zh: "HTTP 請求頭",
    cat: "network",
    catLabel: "網絡",
    catIcon: "🌐",
    desc: "網絡請求嘅「信封」，用嚟傳送額外資訊。例如 `X-Api-Key` 就係一種 Header，用嚟告訴伺服器你係邊個。",
    analogy: "就好似寄信時嘅信封，信封上寫住收件人、寄件人、郵票等資訊，伺服器就係郵局，會根據 Header 嘅資訊決定點樣處理你嘅請求。",
    tags: ["網絡", "HTTP", "通信"],
  },
  // ─── 資料庫 ───────────────────────────────────────────────────────────────
  {
    id: "upsert",
    en: "Upsert",
    zh: "插入或更新",
    cat: "database",
    catLabel: "資料庫",
    catIcon: "🗄️",
    desc: "一個資料庫操作，意思係「如果記錄已存在就更新，如果唔存在就新增」。簡化咗你嘅代碼，唔使分開寫 INSERT 同 UPDATE。",
    analogy: "就好似院舍嘅院友名單，如果 SEC/A333/2025 呢個院友已經有記錄，就更新佢嘅床位同膳食資訊；如果冇呢個院友就新增一筆。",
    tags: ["資料庫", "SQL", "院友資料管理平台"],
  },
  {
    id: "drizzle-orm",
    en: "Drizzle ORM",
    zh: "Drizzle 物件關聯對應",
    cat: "database",
    catLabel: "資料庫",
    catIcon: "🗄️",
    desc: "一個 TypeScript 資料庫工具，讓你用 JavaScript 代碼而唔使寫 SQL。Drizzle 會自動將你嘅代碼轉換成資料庫指令。",
    analogy: "就好似院舍嘅電子表單，你填表格時唔使知道背後嘅資料庫邏輯，系統會自動儲存到正確嘅位置。",
    tags: ["資料庫", "ORM", "TypeScript", "院友資料管理平台"],
  },
  // ─── 系統架構（續） ───────────────────────────────────────────────────────
  {
    id: "trpc",
    en: "tRPC",
    zh: "tRPC 類型安全 RPC",
    cat: "architecture",
    catLabel: "系統架構",
    catIcon: "🏗️",
    desc: "一個 TypeScript 框架，讓前端同後端之間嘅通信更安全。你定義一次數據類型，前端同後端都會自動檢查，減少出錯。",
    analogy: "就好似院舍嘅交班紀錄，護士長同護士之間有統一嘅表格格式，確保資訊傳遞唔會出錯或遺漏。",
    tags: ["架構", "TypeScript", "前後端通信", "院友資料管理平台"],
  },
];

export const CATEGORIES = {
  auth: { label: "登入與安全", icon: "🔐" },
  database: { label: "資料庫", icon: "🗄️" },
  frontend: { label: "前端介面", icon: "🖥️" },
  architecture: { label: "系統架構", icon: "🏗️" },
  hardware: { label: "硬件與連線", icon: "📱" },
  automation: { label: "自動化", icon: "⚙️" },
  file: { label: "文件處理", icon: "📄" },
  network: { label: "網絡", icon: "🌐" },
};
