extern crate napi_build;

fn main() {
  napi_build::setup();
  println!("cargo:rustc-cdylib-link-arg=-Wl,-soname,librust_knn_node.so");
  println!("cargo:warning=Building rust_knn_node with napi-rs");
} 