export const regisValidate = (name, value, compare) => {
  const regex = /^[A-Za-z]*$/gi;

  const validations = {
    required: (value) => (value === "" ? `Enter your ${name}!` : ""),
    minlength: (value, length, name) =>
      value.length <= 5
        ? `${name} must be longer than ${length} charachters!`
        : "",
    maxlength: (value, length, name) =>
      value.length <= 5
        ? `${name} must be longer than ${length} charachters!`
        : "",
    notSameas: (value, compareValue, field) =>
      value === compareValue ? `Value cannot be same as ${field}` : "",
    alreadyExist: (value, compareValue, name) =>
      value === compareValue ? `${name} already exists` : "",
    regexTes: (value, regex) =>
      regex.test(value)
        ? "Password at least contains number or special character!"
        : "",
  };

  const rules = {
    username: [
      { validate: (value) => validations.required(value) },
      {
        validate: (value) => validations.minlength(value, 5, "Username"),
      },
      {
        validate: (value) => validations.maxlength(value, 20, "Username"),
      },
      {
        validate: (value) =>
          validations.alreadyExist(value, compare, "Username"),
      },
    ],
    password: [
      { validate: (value) => validations.required(value) },
      {
        validate: (value) => validations.minlength(value, 5, "Password"),
      },
      {
        validate: (value) => validations.maxlength(value, 20, "Password"),
      },

      {
        validate: (value) => validations.regexTes(value, regex),
      },
      {
        validate: (value) =>
          validations.notSameas(value, compare.username, "Username"),
      },
    ],
  };
  if (rules[name]) {
    for (let rule of rules[name]) {
      const error = rule.validate(value);

      if (error) {
        return error;
      }
    }
  }

  return false;
};

export const LoginValidate = (name, value) => {
  const validations = {
    required: (value) => (value === "" ? `Enter your username` : ""),
  };

  const rules = {
    username: (value) => validations.required(value),
  };

  if (rules[name]) {
    const error = rules[name](value);

    if (error) {
      return error;
    }
  }

  return false;
};
