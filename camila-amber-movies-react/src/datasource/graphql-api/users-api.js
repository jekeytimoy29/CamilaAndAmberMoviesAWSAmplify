import { API } from "aws-amplify";
import { listUsers, getUser } from "../../graphql/queries";
import { createUser, updateUser, deleteUser } from "../../graphql/mutations";

export const getUsersApi = async () => {
  try {
    const apiData = await API.graphql({ query: listUsers });
    if (apiData.data !== null) return apiData.data.listUsers.items;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const getUserApi = async (id) => {
  try {
    const apiData = await API.graphql({
      query: getUser,
      variables: { id },
    });
    if (apiData.data !== null) return apiData.data.getUser;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const deleteUserApi = async (id) => {
  try {
    const apiData = await API.graphql({
      query: deleteUser,
      variables: { input: { id } },
    });
    if (apiData.data !== null) return true;
  } catch (err) {
    console.log(err);
  }

  return false;
};

export const addUserApi = async (user) => {
  try {
    const apiData = await API.graphql({
      query: createUser,
      variables: { input: user },
    });
    if (apiData.data !== null) return apiData.data.createUser;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const updateUserApi = async (user) => {
  try {
    const apiData = await API.graphql({
      query: updateUser,
      variables: { input: user },
    });
    if (apiData.data !== null) return apiData.data.updateUser;
  } catch (err) {
    console.log(err);
  }

  return null;
};
