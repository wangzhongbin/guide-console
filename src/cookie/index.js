import Cookies from 'js-cookie'

const tokenKey = 'GUIDE_ACCOUNT_TOKEN'
const multiTenantKey = 'MULTI_TENANT_TOKEN'

export const getToken = () => Cookies.get(tokenKey)

export const setToken = (token, boo, expiresTime) => {
  const expires = new Date(new Date() * 1 + expiresTime * 1000)
  Cookies.set(tokenKey, token, { expires })
  Cookies.set(multiTenantKey, boo, { expires })
}

export const removeToken = () => {
  Cookies.remove(tokenKey)
  Cookies.remove(multiTenantKey)
}

export const getMultiTenant = () => Cookies.get(multiTenantKey)
