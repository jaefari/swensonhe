const buildValidator = (schema) => {
  return function validator(payload) {
    const { error } = schema.validate(payload, { abortEarly: false });

    if (error) throw (new Error(error));
    return true;
  };
};

module.exports = buildValidator;
