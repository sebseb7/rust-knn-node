const { upload_data, find_nearest_neighbors } = require('../native');

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
    
    return find_nearest_neighbors(query, k, wordOrderSensitive);
  }
}

module.exports = RustKNN; 