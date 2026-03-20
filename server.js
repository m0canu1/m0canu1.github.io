import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  // Remove query parameters and decode URL
  let filePath = path.join(__dirname, req.url.split('?')[0]);

  // If it's a directory, try to serve index.html
  if (req.url === '/' || req.url === '') {
    filePath = path.join(__dirname, 'index.html');
  }

  // Security: prevent directory traversal
  const realPath = path.resolve(filePath);
  if (!realPath.startsWith(path.resolve(__dirname))) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Try index.html for directories
      if (err.code === 'ENOENT') {
        const indexPath = path.join(filePath, 'index.html');
        return fs.readFile(indexPath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        });
      }
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }

    // Handle directories
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      return fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }

    // Read and serve file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }

      // Set content type
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      // Add cache headers for static assets
      const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=3600';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`⚙️  Node.js version: ${process.version}`);
  console.log(`\n Press Ctrl+C to stop the server`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server stopped');
  process.exit(0);
});
