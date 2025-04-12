const RustKNN = require('../src');

// Sample data
const fruits = [
  'apple',
  'banana',
  'orange',
  'strawberry',
  'blueberry',
  'watermelon',
  'pineapple',
  'mango',
  'grape',
  'cherry'
];

// Upload data to KNN engine
RustKNN.uploadStrings(fruits);
console.log('Data uploaded successfully');

// Find 3 nearest neighbors to "aple" with word order sensitivity (default)
const wordOrderSensitive = RustKNN.findNearestNeighbors('aple', 3);
console.log('Word-order sensitive results:', wordOrderSensitive);

// Find 3 nearest neighbors using word-order independent search
const wordOrderIndependent = RustKNN.findNearestNeighbors('aple', 3, false);
console.log('Word-order independent results:', wordOrderIndependent);

// Example with multi-word strings
const phrases = [
  'premium device techno',
  'device premium techno',
  'techno premium device',
  'budget device retro',
  'luxury premium gadget'
];

// Upload new data
RustKNN.uploadStrings(phrases);

// Query with both modes
const query = 'premium techno device';
console.log('\nQuery:', query);

const sensitiveResults = RustKNN.findNearestNeighbors(query, 3);
console.log('Word-order sensitive results:', sensitiveResults);

const independentResults = RustKNN.findNearestNeighbors(query, 3, false);
console.log('Word-order independent results:', independentResults); 