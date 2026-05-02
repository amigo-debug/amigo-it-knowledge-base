# Amigo IT 知識庫

院舍 IT 術語自助查詢平台，幫助前線員工快速理解 IT 概念。

## 功能

- 🔍 **快速搜尋**：按術語名稱、描述、標籤搜尋
- 🏷️ **分類篩選**：按系統架構、資料庫、安全等分類瀏覽
- 💡 **院舍比喻**：用院舍場景解釋 IT 概念，易於理解
- 📱 **響應式設計**：支援桌面、平板、手機

## 術語分類

- **登入與安全** 🔐：認證、加密、API Key
- **資料庫** 🗄️：SQL、ORM、數據結構
- **前端介面** 🖥️：UI、網頁、React
- **系統架構** 🏗️：API、微服務、部署
- **硬件與連線** 📱：NFC、QR Code、網絡
- **自動化** ⚙️：排程、觸發器、工作流
- **文件處理** 📄：PDF、Excel、Word
- **網絡** 🌐：域名、SSL、HTTP

## 快速開始

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 構建
pnpm build

# 預覽
pnpm preview
```

## 更新術語

編輯 `client/src/data/terms.ts`，按照格式新增術語：

```typescript
{
  id: "unique-id",
  en: "English Term",
  zh: "中文名稱",
  cat: "category",
  catLabel: "分類中文名",
  catIcon: "emoji",
  desc: "廣東話描述，2-3句",
  analogy: "院舍比喻，1-2句",
  tags: ["標籤1", "標籤2", "來源"],
}
```

## 部署

```bash
pnpm build
# 上傳 dist 目錄到伺服器
```

---

**最後更新：** 2026-04-28  
**術語數量：** 9 個  
**維護者：** Amigo
