/**
 * Blurred Vision — Question Content
 * 41 questions across 5 categories: Landmarks, Pop Culture, Sports,
 * Bar & Drinks, and Bar Gear.
 * Images sourced from Unsplash (images.unsplash.com).
 */

'use strict';

/** @type {Array<{id:string, imageUrl:string, category:string, correctAnswer:string, options:string[]}>} */
const QUESTIONS = [
  /* ── LANDMARKS ─────────────────────────────────────────────────────── */
  {
    id: 'lm1',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'Eiffel Tower',
    options: ['Eiffel Tower', 'Big Ben', 'Burj Khalifa', 'Tokyo Tower'],
  },
  {
    id: 'lm2',
    imageUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'Big Ben',
    options: ['Big Ben', 'Eiffel Tower', 'Leaning Tower of Pisa', 'Cologne Cathedral'],
  },
  {
    id: 'lm3',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'The Colosseum',
    options: ['The Colosseum', 'Parthenon', 'Pantheon', 'Arc de Triomphe'],
  },
  {
    id: 'lm4',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea813?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'Taj Mahal',
    options: ['Taj Mahal', 'Hagia Sophia', 'Alhambra', 'Angkor Wat'],
  },
  {
    id: 'lm5',
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'Golden Gate Bridge',
    options: ['Golden Gate Bridge', 'Brooklyn Bridge', 'Tower Bridge', 'Sydney Harbour Bridge'],
  },
  {
    id: 'lm6',
    imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'Statue of Liberty',
    options: ['Statue of Liberty', 'Christ the Redeemer', 'The Motherland Calls', 'Angel of the North'],
  },
  {
    id: 'lm7',
    imageUrl: 'https://images.unsplash.com/photo-1528072168373-b8ba702079c7?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'Sydney Opera House',
    options: ['Sydney Opera House', 'Guggenheim Bilbao', 'Walt Disney Concert Hall', 'Elbphilharmonie'],
  },
  {
    id: 'lm8',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80',
    category: 'Landmarks',
    correctAnswer: 'Great Wall of China',
    options: ['Great Wall of China', "Hadrian's Wall", 'Berlin Wall', 'Wailing Wall'],
  },

  /* ── POP CULTURE ───────────────────────────────────────────────────────── */
  {
    id: 'pc1',
    imageUrl: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=800&q=80',
    category: 'Pop Culture',
    correctAnswer: 'Acoustic Guitar',
    options: ['Acoustic Guitar', 'Electric Guitar', 'Ukulele', 'Lute'],
  },
  {
    id: 'pc2',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    category: 'Pop Culture',
    correctAnswer: 'Vinyl Record',
    options: ['Vinyl Record', 'CD Disc', 'Floppy Disk', 'Cassette Tape'],
  },
  {
    id: 'pc3',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    category: 'Pop Culture',
    correctAnswer: 'Margherita Pizza',
    options: ['Margherita Pizza', 'Pepperoni Pizza', 'Flatbread', 'Focaccia'],
  },
  {
    id: 'pc6',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    category: 'Pop Culture',
    correctAnswer: 'Jukebox',
    options: ['Jukebox', 'Slot Machine', 'Vending Machine', 'Arcade Cabinet'],
  },
  {
    id: 'pc7',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    category: 'Pop Culture',
    correctAnswer: 'Clapperboard',
    options: ['Clapperboard', 'Film Reel', "Director's Chair", 'Megaphone'],
  },
  {
    id: 'pc8',
    imageUrl: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
    category: 'Pop Culture',
    correctAnswer: 'Popcorn',
    options: ['Popcorn', 'Pretzels', 'Potato Chips', 'Nachos'],
  },

  /* ── SPORTS ───────────────────────────────────────────────────────────── */
  {
    id: 'sp1',
    imageUrl: 'https://images.unsplash.com/photo-1614632537190-23e414627d89?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    correctAnswer: 'Soccer Ball',
    options: ['Soccer Ball', 'Volleyball', 'Rugby Ball', 'Medicine Ball'],
  },
  {
    id: 'sp2',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    correctAnswer: 'Basketball',
    options: ['Basketball', 'Soccer Ball', 'Volleyball', 'Water Polo Ball'],
  },
  {
    id: 'sp3',
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    correctAnswer: 'Tennis Racket',
    options: ['Tennis Racket', 'Badminton Racket', 'Squash Racket', 'Ping-Pong Paddle'],
  },
  {
    id: 'sp4',
    imageUrl: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    correctAnswer: 'Dartboard',
    options: ['Dartboard', 'Archery Target', 'Shooting Target', 'Pinboard'],
  },
  {
    id: 'sp5',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    correctAnswer: 'Mount Everest',
    options: ['Mount Everest', 'K2', 'Mont Blanc', 'Kilimanjaro'],
  },
  {
    id: 'sp6',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    correctAnswer: 'Golf Ball',
    options: ['Golf Ball', 'Ping-Pong Ball', 'Baseball', 'Cricket Ball'],
  },

  /* ── BAR & DRINKS ────────────────────────────────────────────────── */
  {
    id: 'bd1',
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Espresso',
    options: ['Espresso', 'Hot Chocolate', 'Green Tea', 'Broth'],
  },
  {
    id: 'bd2',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Strawberry',
    options: ['Strawberry', 'Raspberry', 'Cherry', 'Rose Hip'],
  },
  {
    id: 'bd3',
    imageUrl: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Orange',
    options: ['Orange', 'Grapefruit', 'Mandarin', 'Pomelo'],
  },
  {
    id: 'bd4',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Lemons',
    options: ['Lemons', 'Limes', 'Yellow Peppers', 'Pears'],
  },
  {
    id: 'bd5',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Red Wine',
    options: ['Red Wine', 'Rosé Wine', 'Cranberry Juice', 'Port'],
  },
  {
    id: 'bd6',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Pint of Beer',
    options: ['Pint of Beer', 'Glass of Cola', 'Iced Tea', 'Root Beer Float'],
  },
  {
    id: 'bd7',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Cocktail Glass',
    options: ['Cocktail Glass', 'Wine Glass', 'Champagne Flute', 'Shot Glass'],
  },
  {
    id: 'bd8',
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Whiskey Tumbler',
    options: ['Whiskey Tumbler', 'Cocktail Glass', 'Wine Glass', 'Beer Mug'],
  },
  {
    id: 'bd9',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Wine Glass',
    options: ['Wine Glass', 'Champagne Flute', 'Cocktail Glass', 'Whiskey Tumbler'],
  },
  {
    id: 'bd10',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Champagne Flute',
    options: ['Champagne Flute', 'Wine Glass', 'Cocktail Glass', 'Beer Mug'],
  },
  {
    id: 'bd11',
    imageUrl: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Limes',
    options: ['Limes', 'Lemons', 'Green Apples', 'Limequats'],
  },
  {
    id: 'bd12',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Bottle of Wine',
    options: ['Bottle of Wine', 'Bottle of Champagne', 'Bottle of Whiskey', 'Bottle of Beer'],
  },
  {
    id: 'bd13',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Hops',
    options: ['Hops', 'Barley', 'Wheat', 'Clover'],
  },
  {
    id: 'bd14',
    imageUrl: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Ice Cubes',
    options: ['Ice Cubes', 'Sugar Cubes', 'Bouillon Cubes', 'Dice'],
  },
  {
    id: 'bd15',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7ea319b9432d?auto=format&fit=crop&w=800&q=80',
    category: 'Bar & Drinks',
    correctAnswer: 'Olives',
    options: ['Olives', 'Grapes', 'Cherries', 'Capers'],
  },

  /* ── BAR GEAR ──────────────────────────────────────────────────────────── */
  {
    id: 'bg1',
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80',
    category: 'Bar Gear',
    correctAnswer: 'Cocktail Shaker',
    options: ['Cocktail Shaker', 'Coffee Thermos', 'Water Bottle', 'Travel Mug'],
  },
  {
    id: 'bg2',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    category: 'Bar Gear',
    correctAnswer: 'Corkscrew',
    options: ['Corkscrew', 'Bottle Opener', 'Can Opener', 'Ice Pick'],
  },
  {
    id: 'bg3',
    imageUrl: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&w=800&q=80',
    category: 'Bar Gear',
    correctAnswer: 'Shot Glass',
    options: ['Shot Glass', 'Espresso Cup', 'Cocktail Glass', 'Egg Cup'],
  },
  {
    id: 'bg4',
    imageUrl: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=800&q=80',
    category: 'Bar Gear',
    correctAnswer: 'Beer Tap',
    options: ['Beer Tap', 'Soda Fountain', 'Water Faucet', 'Fire Hydrant'],
  },
  {
    id: 'bg5',
    imageUrl: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=800&q=80',
    category: 'Bar Gear',
    correctAnswer: 'Pool Cue',
    options: ['Pool Cue', 'Hockey Stick', 'Baseball Bat', 'Walking Cane'],
  },
  {
    id: 'bg6',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80',
    category: 'Bar Gear',
    correctAnswer: 'Beer Mug',
    options: ['Beer Mug', 'Coffee Mug', 'Travel Mug', 'Shot Glass'],
  },
];

/** Shuffle array in-place (Fisher-Yates). */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Return a shuffled deck of up to `count` questions.
 * Ensures at least one question from each category if possible.
 */
function buildDeck(count = 10) {
  const categories = [...new Set(QUESTIONS.map(q => q.category))];
  const picked = [];
  const remaining = [...QUESTIONS];

  // First, pick one per category to ensure variety
  for (const cat of categories) {
    const catQs = remaining.filter(q => q.category === cat);
    if (catQs.length > 0) {
      const chosen = catQs[Math.floor(Math.random() * catQs.length)];
      picked.push(chosen);
      remaining.splice(remaining.indexOf(chosen), 1);
    }
  }

  // Fill remaining slots randomly
  shuffleArray(remaining);
  while (picked.length < count && remaining.length > 0) {
    picked.push(remaining.pop());
  }

  return shuffleArray(picked).slice(0, count);
}
