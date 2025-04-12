// Try to load the native module from different possible locations
let nativeModule;
const debug = true;

if (debug) {
  console.log('Debug mode enabled');
  console.log('Current working directory:', process.cwd());
  console.log('Native module search paths:');
  console.log('1. ../native');
  console.log('2. ../native/rust-knn-node.node');
  console.log('3. Platform-specific path');
}

try {
  // First try the standard location
  nativeModule = require('../native');
  if (debug) {
    console.log('Successfully loaded from ../native');
    console.log('Module exports:', Object.keys(nativeModule));
  }
} catch (err) {
  if (debug) console.log('Failed to load from ../native:', err.message);
  
  try {
    // Then try the specific node file
    nativeModule = require('../native/rust-knn-node.node');
    if (debug) {
      console.log('Successfully loaded from ../native/rust-knn-node.node');
      console.log('Module exports:', Object.keys(nativeModule));
    }
  } catch (err2) {
    if (debug) console.log('Failed to load from ../native/rust-knn-node.node:', err2.message);
    
    try {
      // Finally try the direct release path
      const { platform, arch } = process;
      const path = `../native/${platform}-${arch}/release/rust-knn-node.node`;
      if (debug) console.log('Trying platform-specific path:', path);
      
      nativeModule = require(path);
      if (debug) {
        console.log(`Successfully loaded from ${path}`);
        console.log('Module exports:', Object.keys(nativeModule));
      }
    } catch (err3) {
      if (debug) {
        console.log('All loading attempts failed.');
        console.log('Last error:', err3.message);
        
        // Try to find the file
        const fs = require('fs');
        const path = require('path');
        console.log('Searching for native module files:');
        
        const searchDir = (dir) => {
          try {
            const files = fs.readdirSync(dir);
            console.log(`Contents of ${dir}:`, files);
            
            for (const file of files) {
              const fullPath = path.join(dir, file);
              try {
                const stats = fs.statSync(fullPath);
                if (stats.isDirectory()) {
                  searchDir(fullPath);
                }
              } catch (e) {
                console.log(`Error reading ${fullPath}:`, e.message);
              }
            }
          } catch (e) {
            console.log(`Error reading directory ${dir}:`, e.message);
          }
        };
        
        searchDir(path.join(process.cwd(), 'native'));
      }
      
      // Create a mock module for development/testing
      console.log('Creating mock module for testing');
      nativeModule = {
        upload_data: (strings) => {
          console.log('MOCK: Uploaded strings:', strings);
          return;
        },
        find_nearest_neighbors: (query, k, wordOrderSensitive) => {
          console.log('MOCK: Finding neighbors for:', query, 'k:', k, 'wordOrderSensitive:', wordOrderSensitive);
          return ['apple', 'banana', 'orange'].sort((a, b) => 
            Math.abs(a.length - query.length) - Math.abs(b.length - query.length)
          ).slice(0, k);
        }
      };
    }
  }
}

// Extract the functions from the module
const { upload_data, find_nearest_neighbors } = nativeModule;

// Check if functions are available
if (debug) {
  console.log('upload_data is a function?', typeof upload_data === 'function');
  console.log('find_nearest_neighbors is a function?', typeof find_nearest_neighbors === 'function');
}

/**
 * RustKNN - A Node.js wrapper for the rust_knn library
 */
class RustKNN {
  /**
   * Upload string data to the KNN engine
   * @param {string[]} strings - Array of strings to upload
   * @returns {void}
   */
  static uploadStrings(strings) {
    if (!Array.isArray(strings)) {
      throw new Error('Input must be an array of strings');
    }
    
    if (typeof upload_data !== 'function') {
      throw new Error(`upload_data is not a function, it is a ${typeof upload_data}`);
    }
    
    return upload_data(strings);
  }

  /**
   * Find k-nearest neighbors to a query string
   * @param {string} query - The query string
   * @param {number} k - Number of nearest neighbors to return
   * @param {boolean} [wordOrderSensitive=true] - Whether to use word order sensitive search
   * @returns {string[]} Array of nearest neighbor strings
   */
  static findNearestNeighbors(query, k, wordOrderSensitive = true) {
    if (typeof query !== 'string') {
      throw new Error('Query must be a string');
    }
    
    if (typeof k !== 'number' || k < 1) {
      throw new Error('k must be a positive number');
    }
    
    if (typeof find_nearest_neighbors !== 'function') {
      throw new Error(`find_nearest_neighbors is not a function, it is a ${typeof find_nearest_neighbors}`);
    }
    
    return find_nearest_neighbors(query, k, wordOrderSensitive);
  }
}

module.exports = RustKNN; 