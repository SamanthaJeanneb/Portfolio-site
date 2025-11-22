#!/usr/bin/env node

/**
 * Image compression script using ImageMagick
 * Compresses PNG and JPG images in the public directory
 * 
 * Usage: node scripts/compress-images.js [directory]
 * Example: node scripts/compress-images.js public/suzanne
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || 'public';

function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    return false;
  }

  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    if (ext === '.png') {
      // More aggressive PNG compression: optimize, reduce colors if possible, max compression
      // Try pngquant first if available, otherwise use ImageMagick
      try {
        execSync(`which pngquant`, { stdio: 'ignore' });
        // Use pngquant for better compression (quality 80-100)
        execSync(`pngquant --quality=80-90 --ext .png --force "${filePath}"`, { stdio: 'ignore' });
      } catch {
        // Fallback to ImageMagick with aggressive settings
        execSync(`convert "${filePath}" -strip -quality 85 -define png:compression-level=9 -define png:compression-filter=5 -define png:compression-strategy=1 "${filePath}"`, { stdio: 'ignore' });
      }
    } else {
      // Compress JPG with ImageMagick (quality 80 for better compression, strip metadata)
      execSync(`convert "${filePath}" -strip -quality 80 -interlace Plane "${filePath}"`, { stdio: 'ignore' });
    }

    const newStats = fs.statSync(filePath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(filePath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
    return true;
  } catch (error) {
    console.error(`✗ Error compressing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

  console.log(`Compressing images in: ${dir}\n`);
  
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let compressed = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.isFile()) {
      if (compressImage(fullPath)) {
        compressed++;
      }
    }
  }

  if (compressed > 0) {
    console.log(`\n✓ Compressed ${compressed} image(s) in ${dir}`);
  }
}

// Check if ImageMagick is available
try {
  execSync('which convert', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: ImageMagick (convert) is not installed or not in PATH');
  console.error('Please install ImageMagick: sudo apt-get install imagemagick (Linux) or brew install imagemagick (Mac)');
  process.exit(1);
}

processDirectory(targetDir);
console.log('\n✓ Image compression complete!');

