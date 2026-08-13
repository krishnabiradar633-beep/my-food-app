export const categories = [
  { id: 'all', name: 'All Menu' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];

const bImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1511993226957-cd166aba52d8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1508985436669-c9cc328e9aca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1680352857466-50550e5610db?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529268127899-36bf4524c254?auto=format&fit=crop&w=600&q=80'
];

const sImages = [
  'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529665730773-4f3fda31a5f9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1602192103315-e6dbed88004a?auto=format&fit=crop&w=600&q=80'
];

const dImages = [
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1611200945005-403b70229452?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1518185343678-aac7955ef14a?auto=format&fit=crop&w=600&q=80'
];

const deImages = [
  'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
];

export const menuItems = [
  // --- BURGERS ---
  {
    id: 1, name: 'Classic Smash Burger', description: 'Double beef patty, American cheese, caramelized onions, house sauce on a toasted brioche bun.',
    price: 8.99, category: 'burgers', image: bImages[0], options: ['Extra Cheese', 'Bacon', 'No Onions']
  },
  {
    id: 2, name: 'Spicy Crispy Chicken', description: 'Crispy fried chicken breast, spicy slaw, pickles, and habanero mayo.',
    price: 9.49, category: 'burgers', image: bImages[1], options: ['Extra Spicy', 'No Pickles', 'Add Cheese']
  },
  {
    id: 3, name: 'Truffle Mushroom Swiss', description: 'Beef patty, roasted wild mushrooms, Swiss cheese, and truffle aioli.',
    price: 10.99, category: 'burgers', image: bImages[2], options: ['Extra Mushroom', 'Double Patty']
  },
  {
    id: 4, name: 'BBQ Bacon Burger', description: 'Thick beef patty, crispy bacon, onion rings, cheddar cheese, and smoky BBQ sauce.',
    price: 11.49, category: 'burgers', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Bacon_cheeseburger.jpg', options: ['Extra Bacon', 'No BBQ Sauce', 'Gluten-Free Bun']
  },
  {
    id: 5, name: 'Double Cheeseburger', description: 'Two quarter-pound patties layered with cheddar cheese, ketchup, mustard, and pickles.',
    price: 10.49, category: 'burgers', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Double_cheeseburger.jpg', options: ['Extra Cheese', 'Add Bacon']
  },
  {
    id: 6, name: 'Veggie Bean Burger', description: 'House-made black bean patty, avocado, lettuce, tomato, and vegan mayo.',
    price: 9.99, category: 'burgers', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Veggie_burger.jpg', options: ['Extra Avocado', 'Gluten-Free Bun']
  },
  {
    id: 7, name: 'Blue Cheese Burger', description: 'Beef patty, crumbled blue cheese, crispy onions, and arugula.',
    price: 11.99, category: 'burgers', image: bImages[6], options: ['Medium Rare', 'Well Done']
  },
  {
    id: 8, name: 'Hawaiian Teriyaki Burger', description: 'Grilled pineapple, teriyaki glaze, Swiss cheese, and lettuce.',
    price: 10.99, category: 'burgers', image: bImages[7], options: ['Extra Pineapple']
  },
  {
    id: 9, name: 'Jalapeño Popper Burger', description: 'Beef patty topped with cream cheese, crispy jalapeños, and bacon.',
    price: 12.49, category: 'burgers', image: bImages[0], options: ['Extra Jalapeños', 'Extra Bacon']
  },
  {
    id: 10, name: 'The Monster Burger', description: 'Triple patty, triple cheese, bacon, egg, and onion rings.',
    price: 15.99, category: 'burgers', image: bImages[1], options: ['No Egg', 'Add Extra Patty']
  },

  // --- SIDES ---
  {
    id: 11, name: 'Loaded Fries', description: 'Crispy golden fries topped with melted cheese, bacon bits, jalapeños, and ranch drizzle.',
    price: 5.99, category: 'sides', image: sImages[0], options: ['No Jalapeños', 'Extra Bacon', 'Extra Cheese']
  },
  {
    id: 12, name: 'Onion Rings', description: 'Thick-cut, beer-battered onion rings served with a side of zesty sauce.',
    price: 4.49, category: 'sides', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Onion_rings.jpg', options: ['Extra Sauce']
  },
  {
    id: 13, name: 'Sweet Potato Fries', description: 'Crispy sweet potato fries with a light dusting of sea salt.',
    price: 4.99, category: 'sides', image: sImages[3], options: ['Add Maple Dip', 'No Salt']
  },
  {
    id: 14, name: 'Crispy Chicken Nuggets', description: '10 pieces of golden, crispy chicken nuggets with your choice of dipping sauce.',
    price: 6.99, category: 'sides', image: sImages[1], options: ['BBQ Sauce', 'Ranch', 'Honey Mustard']
  },
  {
    id: 15, name: 'Mozzarella Sticks', description: 'Six gooey mozzarella sticks served with warm marinara dipping sauce.',
    price: 5.49, category: 'sides', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Mozzarella_sticks.jpg', options: ['Extra Marinara']
  },
  {
    id: 16, name: 'Chili Cheese Tots', description: 'Golden tater tots smothered in house chili and cheddar cheese.',
    price: 6.49, category: 'sides', image: sImages[0], options: ['Add Onions', 'Add Jalapeños']
  },
  {
    id: 17, name: 'Mac and Cheese Bites', description: 'Crispy fried bites filled with creamy mac and cheese.',
    price: 5.99, category: 'sides', image: sImages[1], options: ['Add Ranch']
  },
  {
    id: 18, name: 'Side Salad', description: 'Fresh mixed greens, cherry tomatoes, cucumbers, and balsamic vinaigrette.',
    price: 3.99, category: 'sides', image: sImages[3], options: ['Ranch Dressing', 'No Tomatoes']
  },
  {
    id: 19, name: 'Coleslaw', description: 'Creamy and crunchy house-made cabbage slaw.',
    price: 2.99, category: 'sides', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Coleslaw.jpg', options: []
  },
  {
    id: 20, name: 'Garlic Breadsticks', description: 'Three warm, buttery breadsticks dusted with garlic and parmesan.',
    price: 3.49, category: 'sides', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Garlic_bread.jpg', options: ['Add Marinara']
  },

  // --- DRINKS ---
  {
    id: 21, name: 'Artisan Lemonade', description: 'Freshly squeezed lemons with a hint of mint and agave.',
    price: 3.49, category: 'drinks', image: dImages[0], options: ['Less Ice', 'Extra Mint']
  },
  {
    id: 22, name: 'Vanilla Bean Shake', description: 'Thick and creamy milkshake made with real Madagascar vanilla bean.',
    price: 4.99, category: 'drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Vanilla_milkshake.jpg', options: ['Whipped Cream', 'Cherry on top']
  },
  {
    id: 23, name: 'Strawberry Milkshake', description: 'Classic strawberry milkshake blended with fresh strawberries and ice cream.',
    price: 4.99, category: 'drinks', image: dImages[1], options: ['Whipped Cream', 'Extra Strawberries']
  },
  {
    id: 24, name: 'Iced Caramel Coffee', description: 'Cold brewed coffee with milk, ice, and a rich caramel drizzle.',
    price: 4.49, category: 'drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Iced_coffee.jpg', options: ['Oat Milk', 'Extra Caramel', 'Less Ice']
  },
  {
    id: 25, name: 'Classic Cola', description: 'Ice cold fountain cola.',
    price: 2.49, category: 'drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Coca-Cola.jpg', options: ['No Ice', 'Diet']
  },
  {
    id: 26, name: 'Root Beer Float', description: 'Classic root beer poured over a generous scoop of vanilla ice cream.',
    price: 4.99, category: 'drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Root_Beer_Float.jpg', options: ['Extra Ice Cream']
  },
  {
    id: 27, name: 'Mango Smoothie', description: 'Refreshing blended smoothie with real mango and yogurt.',
    price: 5.49, category: 'drinks', image: dImages[1], options: ['Dairy Free']
  },
  {
    id: 28, name: 'Iced Peach Tea', description: 'Sweetened iced black tea with fresh peach syrup.',
    price: 3.49, category: 'drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Iced_tea.jpg', options: ['Unsweetened']
  },
  {
    id: 29, name: 'Chocolate Milkshake', description: 'Rich chocolate ice cream blended with milk and chocolate syrup.',
    price: 4.99, category: 'drinks', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Chocolate_milkshake.jpg', options: ['Whipped Cream', 'Extra Syrup']
  },
  {
    id: 30, name: 'Fresh Orange Juice', description: '100% freshly squeezed orange juice.',
    price: 3.99, category: 'drinks', image: dImages[0], options: ['No Pulp']
  },

  // --- DESSERTS ---
  {
    id: 31, name: 'Double Chocolate Brownie', description: 'Warm, gooey chocolate brownie with chunks of dark chocolate.',
    price: 3.99, category: 'desserts', image: deImages[0], options: ['Add Vanilla Ice Cream', 'Extra Chocolate Syrup']
  },
  {
    id: 32, name: 'Classic Cheesecake', description: 'New York style cheesecake with a buttery graham cracker crust.',
    price: 5.49, category: 'desserts', image: deImages[1], options: ['Strawberry Topping', 'Caramel Drizzle']
  },
  {
    id: 33, name: 'Apple Pie', description: 'Warm slice of traditional apple pie with a flaky crust.',
    price: 4.49, category: 'desserts', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Apple_pie.jpg', options: ['A la Mode']
  },
  {
    id: 34, name: 'Ice Cream Sundae', description: 'Three scoops of vanilla ice cream topped with hot fudge, whipped cream, and a cherry.',
    price: 5.99, category: 'desserts', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Sundae.jpg', options: ['Extra Fudge', 'Add Nuts']
  },
  {
    id: 35, name: 'Chocolate Chip Cookie', description: 'Giant, warm chocolate chip cookie baked fresh daily.',
    price: 2.99, category: 'desserts', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Chocolate_chip_cookie.jpg', options: ['Warm it up']
  },
  {
    id: 36, name: 'Churros with Chocolate Dip', description: 'Crispy fried dough dusted with cinnamon sugar and served with warm chocolate sauce.',
    price: 4.99, category: 'desserts', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Churros.jpg', options: ['Extra Dip']
  },
  {
    id: 37, name: 'Red Velvet Cupcake', description: 'Moist red velvet cake topped with rich cream cheese frosting.',
    price: 3.49, category: 'desserts', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Red_velvet_cake.jpg', options: []
  },
  {
    id: 38, name: 'Banana Split', description: 'Classic banana split with three ice cream flavors, syrups, and toppings.',
    price: 6.49, category: 'desserts', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Banana_split.JPG', options: ['No Nuts']
  },
  {
    id: 39, name: 'Tiramisu', description: 'Italian coffee-flavored dessert layered with mascarpone cheese.',
    price: 5.99, category: 'desserts', image: 'https://en.wikipedia.org/wiki/Special:FilePath/Tiramisu.jpg', options: []
  },
  {
    id: 40, name: 'Cinnamon Roll', description: 'Warm, giant cinnamon roll dripping with sweet vanilla icing.',
    price: 4.49, category: 'desserts', image: deImages[2], options: ['Extra Icing']
  }
];
