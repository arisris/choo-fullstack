const { validationResult } = require("express-validator");

exports.throwIfNotValid = async (req, values) => {
  if (Array.isArray(values)) {
    await Promise.all(values.filter(i => i && i.run).map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw errors.throw();
    return errors;
  } else {
    throw new Error("The values of validation chain accepted only Array");
  }
}