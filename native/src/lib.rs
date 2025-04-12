#![deny(clippy::all)]

use napi_derive::napi;
use rust_knn::{upload_strings, k_nearest_neighbour_sort};

#[napi]
pub fn uploadData(strings: Vec<String>) -> napi::Result<()> {
  upload_strings(strings).map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi]
pub fn findNearestNeighbors(
  query: String,
  k: u32,
  word_order_sensitive: Option<bool>,
) -> napi::Result<Vec<String>> {
  k_nearest_neighbour_sort(query, k, word_order_sensitive)
    .map_err(|e| napi::Error::from_reason(e.to_string()))
} 