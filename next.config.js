/** @type {import('next').NextConfig} */

// 環境変数を取得
const ngate = process.env.NGATE;
const port2 = process.env.PORT2 || "3002:3000";
// PORT2（ホスト:コンテナ）からホスト側の番号を取り出す
const hostp = port2.split(":")[0];

const nextConfig = {
    // pagesディレクトリ、pages/index.jsを作成し、以下を追記して旧構成を有効化
    reactStrictMode: true,
    experimental: {
        // trueにしてpages/index.jsを削除したらAppディレクトリが有効
        // falseにすればpages/index.jsが有効
        appDir: false,
    },

    env: {
        // 環境変数を設定
        ngate: ngate,
        hostp: hostp,
    },
}

module.exports = nextConfig