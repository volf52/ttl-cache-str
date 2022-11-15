#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use std::collections::HashMap;

// todo: add builder
// todo: add actual ttl cache

#[napi]
#[derive(Debug, Default)]
pub struct TtlStrCache {
  cache: HashMap<String, String>,
}

#[napi]
impl TtlStrCache {
  #[napi(constructor)]
  #[must_use]
  pub fn new() -> Self {
    Self {
      cache: HashMap::new(),
    }
  }

  #[napi]
  pub fn set(&mut self, key: String, value: String) {
    self.cache.insert(key, value);
  }

  #[napi]
  #[must_use]
  pub fn get(&self, key: String) -> Option<String> {
    self.cache.get(&key).cloned()
  }

  #[napi]
  pub fn delete(&mut self, key: String) {
    self.cache.remove(&key);
  }

  #[napi]
  pub fn clear(&mut self) {
    self.cache.clear();
  }

  #[napi]
  #[must_use]
  pub fn has(&self, key: String) -> bool {
    self.cache.contains_key(&key)
  }

  #[napi(getter)]
  #[must_use]
  pub fn length(&self) -> u32 {
    self.len()
  }
}

impl TtlStrCache {
  #[inline(always)]
  fn len(&self) -> u32 {
    self.cache.len() as u32
  }
}
