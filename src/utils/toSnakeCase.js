import { snakeCase } from 'snake-case';

const toSnakeCase = (object) => {
  let snakeObject = {};
  for (const key in object) {
    snakeObject = {
      ...snakeObject,
      [snakeCase(key)]: object[key],
    };
  }
  return snakeObject;
};
export default toSnakeCase;
