declare module 'css' {
  export function parse(css: string, options?: any): any;
  export function stringify(obj: any, options?: any): string;
}
