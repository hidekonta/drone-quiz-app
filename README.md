# 無人航空機操縦士 学科試験練習アプリ

二等無人航空機操縦士（ドローン操縦士）の学科試験向けの練習アプリです。

## 機能

- 📝 20問の四択問題
- ✅ 回答後に即座に正誤判定を表示
- 📚 詳細な解説付き
- 📊 正答数をカウント
- 📱 スマートフォン対応のレスポンシブデザイン

## 技術スタック

- **フロントエンド**: Next.js 14.2.15
- **スタイリング**: Tailwind CSS
- **データ管理**: JSON ファイル

## インストール

```bash
npm install
```

## 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

本番用にビルドする場合：

```bash
npm run build
npm start
```

## ファイル構成

```
03.drone-quiz-app/
├── app/
│   ├── page.js              # メインページ
│   ├── layout.js            # レイアウト
│   ├── globals.css          # グローバルスタイル
│   └── data/
│       ├── questions.json   # 問題データ（初級版）
│       └── questions.enhanced.json  # 問題データ（詳細解説版）
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## 問題データについて

問題データは JSON 形式で管理されています。新しい問題を追加する場合は、`questions.enhanced.json` に以下の形式で追加してください：

```json
{
  "id": 21,
  "question": "問題文",
  "options": ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  "answer": 0,
  "explanation": "詳細な解説"
}
```

## ライセンス

MIT

## 作成者

Drone Quiz App Developer
