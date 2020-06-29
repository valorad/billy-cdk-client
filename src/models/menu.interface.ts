export interface MenuItem {
  name: string,
  link?: string,
  activate?: (...args: any[]) => any,
}