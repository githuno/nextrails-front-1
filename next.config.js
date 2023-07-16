/** @type {import('next').NextConfig} */
const nextConfig = {
    // pagesディレクトリ、pages/index.jsを作成し、以下を追記して旧構成を有効化
    reactStrictMode: true,
    experimental: {
        // trueにしてpages/index.jsを削除したらAppディレクトリが有効
        // falseにすればpages/index.jsが有効
        appDir: false,
    },
}

module.exports = nextConfig