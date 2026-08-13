const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Place an order (Student/User)
router.post('/', authenticateToken, async (req, res) => {
  const { items, totalPrice, paymentStatus } = req.body;
  const userId = req.user.id;

  try {
    await req.db.run('BEGIN TRANSACTION');

    const result = await req.db.run(
      'INSERT INTO orders (user_id, total_price, status, payment_status) VALUES (?, ?, ?, ?)',
      [userId, totalPrice, 'Pending', paymentStatus || 'Paid']
    );
    const orderId = result.lastID;

    for (const item of items) {
      await req.db.run(
        'INSERT INTO order_items (order_id, product_id, quantity, options, price_at_time) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.id, item.quantity, JSON.stringify(item.selectedOptions || []), item.price]
      );
      
      // Reduce stock
      await req.db.run('UPDATE products SET stock_count = stock_count - ? WHERE id = ?', [item.quantity, item.id]);
    }

    await req.db.run('COMMIT');
    res.status(201).json({ orderId, message: 'Order placed successfully' });
  } catch (err) {
    await req.db.run('ROLLBACK');
    res.status(500).json({ error: err.message });
  }
});

// Get user's orders (Student)
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const orders = await req.db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    
    // Fetch items for each order
    for (const order of orders) {
      const items = await req.db.all(`
        SELECT oi.*, p.name, p.image 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
      `, [order.id]);
      
      order.items = items.map(item => ({
        ...item,
        options: item.options ? JSON.parse(item.options) : []
      }));
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get ALL orders (Admin)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orders = await req.db.all(`
      SELECT o.*, u.name as user_name, u.email as user_email 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `);

    for (const order of orders) {
      const items = await req.db.all(`
        SELECT oi.*, p.name 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
      `, [order.id]);
      
      order.items = items.map(item => ({
        ...item,
        options: item.options ? JSON.parse(item.options) : []
      }));
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Analytics (Admin)
router.get('/analytics', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orders = await req.db.all('SELECT total_price, status, created_at FROM orders');
    
    const totalRevenue = orders
      .filter(o => o.status === 'Completed' || o.status === 'Ready' || o.status === 'Pending' || o.status === 'Preparing')
      .reduce((sum, o) => sum + o.total_price, 0);
      
    const statusCounts = {
      Pending: 0,
      Preparing: 0,
      Ready: 0,
      Completed: 0,
      Cancelled: 0
    };
    
    orders.forEach(o => {
      if (statusCounts[o.status] !== undefined) {
        statusCounts[o.status]++;
      }
    });

    res.json({
      totalOrders: orders.length,
      totalRevenue,
      statusCounts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (Admin)
router.put('/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Pending, Preparing, Ready, Completed, Cancelled
  
  try {
    await req.db.run('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
