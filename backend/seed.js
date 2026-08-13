const { initDb } = require('./db');

const categories = [
  { id: 'all', name: 'All Menu' },
  { id: 'meals', name: 'Meals & Thalis' },
  { id: 'snacks', name: 'Chips & Chocolates' },
  { id: 'canteen-drinks', name: 'Cold Drinks' },
  { id: 'burgers', name: 'Burgers & Fast Food' }
];

const menuItems = [
  { id: 1, name: 'Full Veg Thali', description: 'Complete meal with Paneer Butter Masala, Dal Makhani, 3 Butter Rotis, Jeera Rice, Salad, and Pickle.', price: 12.99, category: 'meals', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', options: ['Extra Roti', 'Add Sweet'] },
  { id: 2, name: 'Mini Thali (Small Meal)', description: 'Quick bite with Dal Tadka, Rice, and 2 Rotis.', price: 6.99, category: 'meals', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', options: ['Extra Dal'] },
  { id: 3, name: 'Paneer Butter Masala', description: 'Rich and creamy paneer curry cooked in a tomato-butter gravy.', price: 8.49, category: 'meals', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=600&q=80', options: ['Extra Paneer', 'Spicy'] },
  { id: 4, name: 'Dal Makhani', description: 'Slow-cooked black lentils with butter and cream.', price: 6.49, category: 'meals', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', options: ['Less Butter'] },
  { id: 5, name: 'Jeera Rice', description: 'Basmati rice tempered with cumin seeds.', price: 3.99, category: 'meals', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', options: [] },
  { id: 6, name: 'Butter Roti', description: 'Hot whole wheat flatbread brushed with butter.', price: 1.50, category: 'meals', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', options: ['No Butter'] },
  
  { id: 7, name: 'Lays Classic Potato Chips', description: 'Crispy, salty, classic potato chips.', price: 1.99, category: 'snacks', image: 'https://images.unsplash.com/photo-1566478989037-e987ce243177?auto=format&fit=crop&w=600&q=80', options: ['Family Size'] },
  { id: 8, name: 'Dairy Milk Chocolate', description: 'Classic creamy milk chocolate bar.', price: 2.49, category: 'snacks', image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=600&q=80', options: ['Large Bar'] },
  { id: 9, name: 'Snickers Bar', description: 'Peanut, caramel, and nougat coated in milk chocolate.', price: 1.99, category: 'snacks', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80', options: [] },
  { id: 10, name: 'Spicy Nachos Packet', description: 'Crunchy tortilla chips with spicy seasoning.', price: 2.99, category: 'snacks', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80', options: [] },

  { id: 11, name: 'Coca-Cola (Can)', description: 'Chilled classic cola.', price: 1.99, category: 'canteen-drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Coca-Cola.jpg', options: ['Diet'] },
  { id: 12, name: 'Sprite (Can)', description: 'Crisp, refreshing lemon-lime soda.', price: 1.99, category: 'canteen-drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', options: [] },
  { id: 13, name: 'Thumbs Up (Bottle)', description: 'Strong, fizzy Indian cola.', price: 2.49, category: 'canteen-drinks', image: 'https://images.unsplash.com/photo-1527960471264-932f2f6d0027?auto=format&fit=crop&w=600&q=80', options: [] },
  { id: 14, name: 'Cold Coffee', description: 'Chilled blended sweet coffee.', price: 3.49, category: 'canteen-drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Iced_coffee.jpg', options: ['Extra Sweet', 'Less Ice'] },

  { id: 15, name: 'Classic Smash Burger', description: 'Double beef patty, American cheese, caramelized onions.', price: 8.99, category: 'burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', options: ['Extra Cheese'] }
];

async function seed() {
  const db = await initDb();

  // Clear existing data (optional, but good for resetting)
  await db.exec('DELETE FROM order_items; DELETE FROM orders; DELETE FROM products; DELETE FROM categories;');

  for (const cat of categories) {
    await db.run('INSERT INTO categories (id, name) VALUES (?, ?)', [cat.id, cat.name]);
  }

  for (const item of menuItems) {
    await db.run(
      'INSERT INTO products (id, name, description, price, category, image, options) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [item.id, item.name, item.description, item.price, item.category, item.image, JSON.stringify(item.options)]
    );
  }

  // Create an admin user for testing
  const bcrypt = require('bcrypt');
  const passwordHash = await bcrypt.hash('admin123', 10);
  await db.run(
    'INSERT OR IGNORE INTO users (id, name, email, password_hash, role) VALUES (1, "Admin", "admin@quickbite.com", ?, "admin")',
    [passwordHash]
  );
  
  const studentHash = await bcrypt.hash('student123', 10);
  await db.run(
    'INSERT OR IGNORE INTO users (id, name, email, password_hash, role) VALUES (2, "Student", "student@quickbite.com", ?, "student")',
    [studentHash]
  );

  console.log('Seed completed.');
}

seed().catch(console.error);
