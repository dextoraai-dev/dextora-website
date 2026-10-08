import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const generatedDir = path.resolve('public/images/generated');

async function optimizeImages() {
  if (!fs.existsSync(generatedDir)) {
    console.error(`Directory not found: ${generatedDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(generatedDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} PNG images in ${generatedDir}`);

  for (const file of files) {
    const inputPath = path.join(generatedDir, file);
    const outputPath = path.join(generatedDir, file.replace(/\.png$/, '.webp'));

    const inputStats = fs.statSync(inputPath);
    console.log(`Optimizing ${file} (${Math.round(inputStats.size / 1024)} KB)...`);

    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    console.log(`  -> Saved ${path.basename(outputPath)} (${Math.round(outputStats.size / 1024)} KB)`);
  }

  console.log('Image optimization complete.');
}

optimizeImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
