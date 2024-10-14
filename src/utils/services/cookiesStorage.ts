import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import { CookieValueTypes, OptionsType } from 'cookies-next/lib/types'

export default class ManageStorage {
  static hasToken(key: string): boolean {
    return !!getCookie(key)
  }

  static getItem(key: string): CookieValueTypes {
    return getCookie(key)
  }

  static removeItem(key: string): void {
    deleteCookie(key)
  }

  static setItem<T>(
    key: string,
    data: T,
    options?: OptionsType | undefined,
  ): void {
    setCookie(key, data, options)
  }
}
