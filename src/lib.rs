#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use endorphin::policy::LazyFixedTTLPolicy;
use endorphin::HashMap;
use std::time::Duration;

// todo: add builder

const DEFAULT_TTL: u64 = 60 * 60 * 24 * 7; // 1 week

#[napi]
pub struct TtlStrCache {
  cache: HashMap<String, String, LazyFixedTTLPolicy>,
}

impl Default for TtlStrCache {
  fn default() -> Self {
    Self {
      cache: HashMap::new(LazyFixedTTLPolicy::new(Duration::from_secs(DEFAULT_TTL))),
    }
  }
}

#[napi]
impl TtlStrCache {
  #[napi(constructor)]
  #[must_use]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi(factory)]
  pub fn with_timeout_ms(timeout_ms: u32) -> Self {
    Self {
      cache: HashMap::new(LazyFixedTTLPolicy::new(Duration::from_millis(
        timeout_ms as u64,
      ))),
    }
  }

  #[napi]
  pub fn set(&mut self, key: String, value: String) {
    self.cache.insert(key, value, ());
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
  /* Can use this to clear the table */
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
