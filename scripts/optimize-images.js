
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory: src/assets
const assetsDir = path.join(__dirname, '../src/assets');

// Configuration
const MAX_WIDTH = 1920;
const QUALITY_JPEG = 80;
const QUALITY_PNG = 80;
const MIN_SIZE_TO_COMPRESS = 200 * 1024; // 200KB

let totalSavings = 0;

async function processFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    // Only process images
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

    try {
        const stats = fs.statSync(filePath);

        // Skip if file is small enough
        if (stats.size < MIN_SIZE_TO_COMPRESS) return;

        console.log(`Processing: ${filePath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Check if resize is needed
        let pipeline = image;
        if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH);
        }

        let buffer;
        if (ext === '.png') {
            buffer = await pipeline.png({ quality: QUALITY_PNG }).toBuffer();
        } else {
            buffer = await pipeline.jpeg({ quality: QUALITY_JPEG, mozjpeg: true }).toBuffer();
        }

        // Only overwrite if we actually saved space
        if (buffer.length < stats.size) {
            const tempPath = filePath + '.tmp';
            fs.writeFileSync(tempPath, buffer);
            fs.rmSync(filePath); // Delete original
            fs.renameSync(tempPath, filePath); // Move temp to original

            const saved = stats.size - buffer.length;
            totalSavings += saved;
            console.log(`  -> Optimized: ${(buffer.length / 1024 / 1024).toFixed(2)} MB (Saved ${(saved / 1024 / 1024).toFixed(2)} MB)`);
        } else {
            console.log(`  -> Skipped: Optimization did not reduce size.`);
        }

    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

async function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            await walkDir(filePath);
        } else {
            await processFile(filePath);
        }
    }
}

// Start
console.log('Starting Image Optimization...');
if (fs.existsSync(assetsDir)) {
    await walkDir(assetsDir);
    console.log('--------------------------------------------------');
    console.log(`Total Space Saved: ${(totalSavings / 1024 / 1024).toFixed(2)} MB`);
} else {
    console.error(`Directory not found: ${assetsDir}`);
}
