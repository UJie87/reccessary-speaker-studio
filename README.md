# RECCESSARY LinkedIn 講者貼文產生器

這是一個免安裝、可直接於瀏覽器使用的 LinkedIn 貼文模板工具。

公開網站：<https://ujie87.github.io/reccessary-speaker-studio/>

## 功能

- 上傳講者頭貼並即時套版
- 從講者下拉選單選擇姓名，自動帶入職稱與對應講題
- 可微調職稱、演講題目與活動資訊
- 一鍵切換繁體中文／泰文版本
- 匯出 LinkedIn 建議尺寸 1080 × 1350 PNG
- 支援系統分享面板；桌面版會下載圖片、複製貼文文字並開啟 LinkedIn

目前下拉選單包含楊菁萍、James Moore、游乃潯（Lobo You）與胡湘渝（Sherry Hu），
並提供繁體中文與泰文的職稱及講題資料。

## 開啟方式

在此資料夾執行：

```bash
python3 -m http.server 4173
```

再開啟 <http://localhost:4173>。

> LinkedIn 基於平台安全限制，不允許未經 OAuth 授權的網站直接代替使用者上傳圖片。
> 本工具在支援 Web Share API 的裝置上可直接呼叫分享面板；其他環境則採用下載圖片、
> 複製文案與開啟 LinkedIn 編輯器的安全流程。

工具預設使用中性人物佔位圖；實際使用時請上傳講者的正方形或半身照。
