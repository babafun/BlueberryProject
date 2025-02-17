declare module "prop-types" {
  // Minimal stub to satisfy TypeScript.
  // Expand these types if you need more detailed type checking.
  export type Validator<T> = (props: any, propName: string, componentName?: string, location?: string, propFullName?: string) => Error | null;
  export type Requireable<T> = Validator<T>;

  // Provide stubs for common validators.
  export const any: Validator<any>;
  export const array: Validator<any>;
  export const bool: Validator<any>;
  export const func: Validator<any>;
  export const number: Validator<any>;
  export const object: Validator<any>;
  export const string: Validator<any>;

  export function checkPropTypes(typeSpecs: { [key: string]: Validator<any> }, values: any, location: string, componentName: string): void;

  const PropTypes: {
    any: Validator<any>;
    array: Validator<any>;
    bool: Validator<any>;
    func: Validator<any>;
    number: Validator<any>;
    object: Validator<any>;
    string: Validator<any>;
    checkPropTypes: typeof checkPropTypes;
  };

  export default PropTypes;
}