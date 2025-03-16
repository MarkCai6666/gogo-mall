const fs = require('fs');
const { createCanvas } = require('canvas');

// 创建渐变背景的函数
function createGradientImage(width, height, colors, text, outputPath) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 创建渐变
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  // 填充背景
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 添加文字
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // 保存图片
  const buffer = canvas.toBuffer('image/webp');
  fs.writeFileSync(outputPath, buffer);
}

// 生成三张不同的banner图片
const banners = [
  {
    colors: ['#FF6B6B', '#4ECDC4'],
    text: '新品上市',
    output: 'public/images/banner-1.webp'
  },
  {
    colors: ['#A8E6CF', '#FFD3B6'],
    text: '限时特惠',
    output: 'public/images/banner-2.webp'
  },
  {
    colors: ['#FF9A9E', '#FAD0C4'],
    text: '品牌专场',
    output: 'public/images/banner-3.webp'
  }
];

banners.forEach(banner => {
  createGradientImage(1200, 400, banner.colors, banner.text, banner.output);
}); 