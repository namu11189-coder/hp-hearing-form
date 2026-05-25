# ホームページ制作ヒアリングフォーム

Cloudflare Pages で公開できる静的フォームです。入力内容は `localStorage` に自動保存し、送信時に Google Apps Script 経由で Google Spreadsheet へ保存します。

## ファイル

- `index.html`: フォーム画面
- `styles.css`: レスポンシブUI
- `app.js`: ステップ制御、入力保存、確認画面、送信処理
- `config.js`: Google Apps Script の送信先URL
- `google-apps-script/Code.gs`: Apps Script 側の保存処理サンプル
- `outputs/homepage-hearing-form/homepage_hearing_form_template.xlsx`: Google Sheets にアップロードして使える保存先テンプレート
- `homepage_hearing_form_agent_spec_utf8_bom.md`: 元の要件定義

## ローカル確認

静的ファイルなので `index.html` をブラウザで開くだけでも確認できます。送信テストまで行う場合は、先に Google Apps Script のURLを `config.js` に設定してください。

## Google Spreadsheet / Apps Script 設定

1. Google Spreadsheet を新規作成します。
2. URL内の `/d/` と `/edit` の間にあるスプレッドシートIDを控えます。
3. 拡張機能から Apps Script を開きます。
4. `google-apps-script/Code.gs` の内容を貼り付けます。
5. `SPREADSHEET_ID` に控えたIDを設定します。
6. デプロイから「新しいデプロイ」を選び、種類は「ウェブアプリ」にします。
7. 実行ユーザーは自分、アクセスできるユーザーは運用方針に合わせて設定します。
8. 発行されたウェブアプリURLを `config.js` の `GAS_ENDPOINT_URL` に設定します。

## Cloudflare Pages

このフォルダをリポジトリに入れて Cloudflare Pages に接続します。ビルドコマンドは不要、出力ディレクトリはルートです。
