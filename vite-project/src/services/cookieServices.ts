import Cookies from "universal-cookie"

const cookies = new Cookies();
class CookieServices {
  get(name: string): string {
    return cookies.get(name);
  }
  set(name: string, value: string | number, options?: { [key: string]: string | number | Date }): void {
    cookies.set(name, value, { ...options })
  }

  remove(name: string, options?: { [key: string]: string | number }): void {
    cookies.remove(name, { ...options })
  }
}

export default new CookieServices();