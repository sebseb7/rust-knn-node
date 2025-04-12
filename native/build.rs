extern crate napi_build;

fn main() {
  napi_build::setup();
  
  // Only use -soname on Linux platforms
  #[cfg(target_os = "linux")]
  println!("cargo:rustc-cdylib-link-arg=-Wl,-soname,librust_knn_node.so");
  
  println!("cargo:warning=Building rust_knn_node with napi-rs");
} 