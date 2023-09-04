import { LocationQuery } from "vue-router";
import { DetailedFingerprint } from "./types";

// adapted from vue router to be always
// the same regardless of order of defined keys
export function queryFingerprint(query: LocationQuery): {
  fingerprint: string;
  detailedFingerprint: DetailedFingerprint;
} {
  let fingerprint = "";
  const detailedFingerprint: DetailedFingerprint = {};
  const keys = Object.keys(query).sort();
  for (const key_index in keys) {
    let key = keys[key_index];
    const value = query[key];
    key = encodeURIComponent(key);
    if (value == null) {
      fingerprint += "&" + key;
      detailedFingerprint[key] = null;
      continue;
    }
    // keep null values
    const values = Array.isArray(value)
      ? value.map((v) => v && encodeURIComponent(v))
      : [value && encodeURIComponent(value)];
    values.sort();
    let valueFingerprint = "";
    for (let i = 0; i < values.length; i++) {
      valueFingerprint += "&" + key;
      if (values[i] != null) {
        valueFingerprint += "=" + values[i];
      }
    }
    fingerprint += valueFingerprint;
    detailedFingerprint[key] = valueFingerprint;
  }
  return { fingerprint, detailedFingerprint };
}
