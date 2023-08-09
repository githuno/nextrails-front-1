/** @type {import('next').NextConfig} */

// 環境変数を取得--------------------------------
// [internal]
const ngate = process.env.NGATE; // "10.0.0.1"
const port2 = process.env.PORT2 || "3002:3000"; // "3002:3000"
const hostp = port2.split(":")[0]; // PORT2（"ホスト側のポート番号":"コンテナ側のポート番号"）からホスト側の番号を切り出す
const internal_ep = "http://" + ngate +":"+ hostp;
// [external] CODESPACEのURLを取得
const codespace_url = `https://${process.env.CODESPACE_NAME}-`+ hostp + `.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`;
const local_url = "http://localhost:" + hostp;

const nextConfig = {
    // pagesディレクトリ、pages/index.jsを作成し、以下を追記して旧構成を有効化
    reactStrictMode: true,
    experimental: {
        // trueにしてpages/index.jsを削除したらAppディレクトリが有効
        // falseにすればpages/index.jsが有効
        appDir: false,
    },

    env: {
        // tsx内で使えるよう環境変数を設定
        internal_ep: internal_ep,
        // ◯ http://backend:3000/api/v1/posts ※「"バックエンドコンテナ名":"コンテナ側のポート番号" 」
        // ✘ http://localhost:${process.env.hostp}/api/v1/posts
        // ✘ https
        
        // `docker network inspect <ネットワーク名>` でプライベートIPは確認可能。
        // クラス違いで複数のプライベートIPを持つ。ngateはdocker-composeで指定したため確実なプライベートIP。
  
        external_ep: process.env.CODESPACES ? codespace_url : local_url,
        // ◯ https://XXX-3002.app.github.dev/api/v1/posts ※CODESPACEのアドレス
        // ✘ https://4.194.120.87:3002/api/v1/posts ※グローバルIPアドレス
        // ✘ http
    },
}

module.exports = nextConfig
