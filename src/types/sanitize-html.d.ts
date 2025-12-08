declare module "sanitize-html" {
  interface IOptions {
    allowedTags?: string[] | false;
    allowedAttributes?: Record<string, string[]>;
    allowedStyles?: Record<string, Record<string, RegExp[]>>;
    allowedSchemes?: string[];
    allowedSchemesByTag?: Record<string, string[]>;
  }

  function sanitizeHtml(dirty: string, options?: IOptions): string;
  export default sanitizeHtml;
}
