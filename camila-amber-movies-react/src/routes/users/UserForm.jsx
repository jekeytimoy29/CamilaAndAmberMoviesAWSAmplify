import CustomFormCard from "../../components/customFormCard/CustomFormCard";
import { redirect } from "react-router-dom";
import { userFormInputs } from "./UserFormInputs";
import {
  getUser,
  updateUser,
  addUser,
} from "../../datasource/local/usersStorage";
import {
  updateUserApi,
  addUserApi,
} from "../../datasource/graphql-api/users-api";
import { withSubmitForm } from "../../hocs/WithSubmitForm";

const UserForm = ({
  userForm,
  setUserForm,
  onSubmitForm,
  errorMessage,
  validated,
}) => {
  const selectionItems = ["User", "Admin"];

  return (
    <CustomFormCard
      title={userForm.id && userForm.id.length ? "Edit User" : "Add User"}
      data={userForm}
      setData={setUserForm}
      inputs={userFormInputs}
      selectionItems={selectionItems}
      onSubmitForm={onSubmitForm}
      errorMessage={errorMessage}
      validated={validated}
    />
  );
};

export async function loader({ params }) {
  let user = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  if (params && params.user_id) {
    user = await getUser(params.user_id);
    if (!user) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }

    user.confirmPassword = user.password;
  }

  return { user };
}

export default withSubmitForm(UserForm);

export async function action({ request, params }) {
  const formData = await request.formData();

  // exclude entry for confirmPassword
  const keysToExclude = ["confirmPassword"];
  const formEntries = Array.from(formData.entries());
  const filteredEntries = formEntries.filter(
    ([key, value]) => !keysToExclude.includes(key)
  );

  let user = Object.fromEntries(filteredEntries);

  if (params && params.user_id) {
    user.id = params.user_id;
    user = await updateUserApi(user);

    if (user) await updateUser(params.user_id, user);
  } else {
    user = await addUserApi(user);

    if (user) await addUser(user);
  }

  return redirect(`/users/${user.id}`);
}
