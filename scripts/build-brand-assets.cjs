const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
  const assets = path.resolve(__dirname, '../public/assets');
  const original = await sharp(path.join(assets, 'logo.webp')).png().toBuffer();
  // Render the existing desktop logo treatment once into portable RGBA assets.
  // The browser no longer needs an external SVG filter or CSS crop to display it.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs><filter id="white" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.2126 -.7152 -.0722 0 1"/>
      <feComponentTransfer><feFuncA type="linear" slope="1.15" intercept="-0.04"/></feComponentTransfer>
      <feComponentTransfer><feFuncA type="gamma" amplitude="1" exponent="0.5" offset="0"/></feComponentTransfer>
    </filter></defs>
    <image width="512" height="512" href="data:image/png;base64,${original.toString('base64')}" filter="url(#white)"/>
  </svg>`;
  const rendered = await sharp(Buffer.from(svg)).png().toBuffer();
  for (const [name, crop] of [
    ['brand-eagle-white-v1.png', { left:110, top:67, width:292, height:287 }],
    ['brand-wordmark-white-v1.png', { left:70, top:372, width:380, height:76 }]
  ]) {
    await sharp(rendered).extract(crop).png().toFile(path.join(assets, name));
    console.log(name);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
