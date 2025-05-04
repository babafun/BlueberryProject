// validateData.js

/**
 * Validates an object against a given shape.
 * @param {object} data - The data to validate.
 * @param {object} shape - The expected shape.
 * @returns {object} - Returns the validated data.
 * @throws {TypeError} - Throws an error if the data doesn't match the shape.
 */
export function validateData(data, shape) {
    const proxy = new Proxy(data, {
      get(target, prop) {
        if (prop in shape) {
          if (typeof target[prop] !== shape[prop]) {
            throw new TypeError(`Invalid type for property '${prop}': expected '${shape[prop]}', got '${typeof target[prop]}'`);
          }
        }
        return target[prop];
      },
      set(target, prop, value) {
        if (prop in shape) {
          if (typeof value !== shape[prop]) {
            throw new TypeError(`Invalid type for property '${prop}': expected '${shape[prop]}', got '${typeof value}'`);
          }
        }
        target[prop] = value;
        return true;
      }
    });
  
    // Ensure the object has all required properties defined in the shape
    for (let prop in shape) {
      if (!(prop in data)) {
        throw new TypeError(`Missing required property: '${prop}'`);
      }
    }
  
    return proxy;
  }
  