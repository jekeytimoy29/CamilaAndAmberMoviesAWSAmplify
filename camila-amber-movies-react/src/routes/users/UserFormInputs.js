export const userFormInputs = [
  {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Name",
    label: "Name",
    required: true,
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "E-mail",
    label: "E-mail",
    required: true,
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
    required: true,
    minLength: 4,
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    minLength: 4,
    required: true,
  },
  {
    id: "role",
    name: "role",
    type: "select",
    label: "Role",
    required: true,
  },
];
