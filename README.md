# rust-knn-node

A Node.js wrapper for [rust_knn](https://github.com/sebseb7/rust_knn), a fast k-nearest neighbors library for string data.

## Features

* Upload string data to in-memory storage
* Search for k-nearest neighbors using Levenshtein distance
* Word-order independent search mode using Jaccard distance
* Fast performance with native Rust implementation

## Installation

```bash
npm install rust-knn-node
```

## Usage

```javascript
const RustKNN = require('rust-knn-node');

// Upload string data
const strings = ['apple', 'banana', 'orange'];
RustKNN.uploadStrings(strings);

// Find 2 nearest neighbors to "aple" (with word order sensitivity)
const results = RustKNN.findNearestNeighbors('aple', 2);
console.log('Word order sensitive results:', results);

// Find 2 nearest neighbors using word-order independent search
const independentResults = RustKNN.findNearestNeighbors('aple', 2, false);
console.log('Word order independent results:', independentResults);
```

## API

### `RustKNN.uploadStrings(strings)`

Upload an array of strings to the KNN engine.

**Parameters:**
- `strings` (string[]): Array of strings to upload

**Returns:** void

### `RustKNN.findNearestNeighbors(query, k, wordOrderSensitive = true)`

Find k-nearest neighbors to a query string.

**Parameters:**
- `query` (string): The query string
- `k` (number): Number of nearest neighbors to return
- `wordOrderSensitive` (boolean, optional): Whether to use word order sensitive search. Defaults to `true`.

**Returns:** string[] - Array of nearest neighbor strings

## Word Order Independence

The library supports two search modes:

1. **Word Order Sensitive** (default): Uses Levenshtein distance to compare strings character by character
   * Good for exact matching or single word queries
   * Order of words matters
   * Example: "premium device techno" and "device premium techno" are considered different

2. **Word Order Independent**: Uses Jaccard distance to compare word sets
   * Better for multi-word queries where word order doesn't matter
   * Much faster for large datasets
   * Example: "premium device techno" and "device premium techno" are treated as the same

To use word-order independent search, pass `false` as the third parameter to `findNearestNeighbors`.

## Performance

The library inherits the impressive performance of the Rust implementation:

* Word-order sensitive search: ~20-25ms for 7000+ items
* Word-order independent search: ~5-6ms for 7000+ items (4x faster)

## Building from Source

```bash
git clone https://github.com/your-username/rust-knn-node.git
cd rust-knn-node
npm install
npm run build
```

## License

Licensed under the 0BSD License (BSD Zero Clause License) - see the LICENSE file for details. 