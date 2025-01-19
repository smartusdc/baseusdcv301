/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '22': '5.5rem', // 88px
      },
      colors: {
        // もし必要なら、カスタムカラーをここに追加
      },
      animation: {
        // もし必要なら、カスタムアニメーションをここに追加
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // すでにpackage.jsonに含まれているので追加
  ],
}
