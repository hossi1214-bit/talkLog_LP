# talkLog Landing Page

外国語学習アプリ「talkLog」の公式ランディングページです。アプリは現在β版準備中で、βテスター登録、機能紹介、開発状況、FAQを提供します。

## 技術構成

- Next.js 16 / React 19 / App Router
- TypeScript / Tailwind CSS 4
- ESLint / npm

## セットアップ

```bash
npm install
copy .env.example .env.local
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。β登録を動作させるにはSupabaseの環境変数が必要です。

## コマンド

```bash
npm run dev     # 開発サーバー
npm run lint    # ESLint
npm run build   # 本番ビルド
npm run start   # 本番サーバー
```

## Vercelへデプロイ

GitHub等へプッシュしてVercelでリポジトリをImportし、Framework PresetをNext.jsに設定します。Environment Variablesへ `.env.example` のうち必要な値を登録してDeployしてください。

## 環境変数

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | canonical・sitemap・robotsの公開URL |
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseプロジェクトURL |
| `SUPABASE_SECRET_KEY` | β登録APIが使うサーバー専用Secret key |
| `NEXT_PUBLIC_X_URL` | Xのリンク |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagramのリンク |
| `NEXT_PUBLIC_GA_ID` | 将来のGoogle Analytics用 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | 将来のSearch Console確認用 |

## コンテンツの変更

- 画像：公式素材は `public/images/talklog-main.png`、生成した用途別素材は `log-kun-speaking.png`、`log-kun-study.png`、`log-kun-ai.png`、`log-kun-cheer.png` です。OGPとfaviconは `og-image.svg`、`favicon.svg` を差し替えられます。
- SNS・URL：`src/config/site.ts` または環境変数を変更します。
- βフォーム：`src/app/api/beta-registration/route.ts` が入力を検証し、Supabaseの `beta_registrations` テーブルへ保存します。Secret keyはサーバー側でのみ使用します。
- 開発状況・FAQ・機能：`src/data/content.ts` の配列を変更します。開発状況のステータスは `完了`、`開発中`、`予定` のいずれかです。
- 本文：`src/app/page.tsx` を変更します。

## 計測の導入

計測IDがない状態ではスクリプトを読み込みません。Google Analyticsを導入する際は `NEXT_PUBLIC_GA_ID` を設定し、ルートレイアウトに公式のGoogle tagを追加してください。CTA・フォーム・スクロールイベントは同じ計測層へ送れるよう、導入時にイベント関数を一箇所へ集約することを推奨します。Vercel Analyticsは必要になった時点で公式パッケージを追加してください。

## 法務ページ

`/privacy`、`/terms`、`/contact` は公開前の暫定文書です。正式公開前に専門家の確認を受けた内容へ差し替えてください。
