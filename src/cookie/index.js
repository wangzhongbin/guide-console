import Cookies from 'js-cookie'

const TokenKey = 'account-token'

export const getToken = () => {
  return Cookies.get(TokenKey)
}

export const setToken = (token, expiresTime) => {
  const expires = new Date(new Date() * 1 + expiresTime * 1000)
  return Cookies.set(TokenKey, token, { expires })
}

export const removeToken = () => {
  return Cookies.remove(TokenKey)
}
