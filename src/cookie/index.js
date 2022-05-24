import Cookies from 'js-cookie'

const TokenKey = 'GUIDE_ACCOUNT_TOKEN'

export const getToken = () => Cookies.get(TokenKey)

export const setToken = (token, expiresTime) => {
  const expires = new Date(new Date() * 1 + expiresTime * 1000)
  return Cookies.set(TokenKey, token, { expires })
}

export const removeToken = () => Cookies.remove(TokenKey)
