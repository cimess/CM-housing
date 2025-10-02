// src/utils/authStore.js
const ACCESS_TOKEN_KEY = "cm_access_token";

export function getAccessToken() {
  try {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

export function setAccessToken(token) {
  try {
    if (token) sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    else sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (e) {
    // ignore storage errors
  }
}

export function removeAccessToken() {
  try {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (e) {}
}
