const express = require('express');
const multer = require('multer');
const path = require('path');
const { requireAdmin, authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await req.db.all('SELECT * FROM products');
    const categories = await req.db.all('SELECT * FROM categories');
    
    // Parse options back to array
    const parsedProducts = products.map(p => ({
      ...p,
      options: p.options ? JSON.parse(p.options) : []
    }));

    res.json({ categories, menuItems: parsedProducts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Add new product (with image upload)
router.post('/', authenticateToken, requireAdmin, upload.single('imageFile'), async (req, res) => {
  const { name, description, price, category, stock_count } = req.body;
  let { image, options } = req.body;
  
  // If a file was uploaded, use the local path instead of URL
  if (req.file) {
    image = 'http://localhost:5000/uploads/' + req.file.filename;
  }
  
  if (typeof options === 'string') {
    try { options = JSON.parse(options); } catch (e) { options = []; }
  }

  try {
    const result = await req.db.run(
      'INSERT INTO products (name, description, price, category, image, options, stock_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, Number(price), category, image, JSON.stringify(options || []), Number(stock_count) || 100]
    );
    res.status(201).json({ id: result.lastID, message: 'Product created', image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update product (e.g. stock, with optional image upload)
router.put('/:id', authenticateToken, requireAdmin, upload.single('imageFile'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock_count } = req.body;
  let { image, options } = req.body;

  if (req.file) {
    image = 'http://localhost:5000/uploads/' + req.file.filename;
  }
  
  if (typeof options === 'string') {
    try { options = JSON.parse(options); } catch (e) { options = []; }
  }
  
  try {
    await req.db.run(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ?, options = ?, stock_count = ? WHERE id = ?',
      [name, description, Number(price), category, image, JSON.stringify(options || []), Number(stock_count), id]
    );
    res.json({ message: 'Product updated', image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Admin: Delete product
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await req.db.run('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
