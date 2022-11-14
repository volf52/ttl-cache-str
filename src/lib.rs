// #![deny(clippy::all)]

use std::collections::HashMap;

#[macro_use]
extern crate napi_derive;

// todo: add builder
// todo: add cache

#[napi(js_name = "TtlStrCache")]
#[derive(Debug, Default)]
pub struct TtlStrCache(HashMap<String, String>);

#[napi]
impl TtlStrCache {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi(factory)]
  pub fn default() -> Self {
    Self(HashMap::new())
  }

  #[napi]
  pub fn set(&mut self, key: String, value: String) {
    self.0.insert(key, value);
  }

  #[napi]
  pub fn length(&self) -> u32 {
    self.0.len() as u32
  }

  #[napi]
  pub fn get(&self, key: String) -> Option<String> {
    self.0.get(&key).map(|v| v.to_owned())
  }
}
