/**
 * Function that composes validation rules for a given field and
 * checks against them if the field is valid.
 *
 * @param {Array} validation validation rules.
 */
const composeValidation = (validation: Array<Function>): any => (field: string): string|null =>
  validation.reduce((acc, validationFunc) => (acc === null ? validationFunc(field) : acc), null);

export default composeValidation;
