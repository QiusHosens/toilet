// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const stateKey = 'Admin-State'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem(TokenKey)
}

export function getState() {
  // return Cookies.get(TokenKey)
  return JSON.parse(localStorage.getItem(stateKey));
}

export function setState(state) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(stateKey, JSON.stringify(state));
}

export function removeState() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem(stateKey)
}