import { API } from "aws-amplify";
import { listComments } from "../../graphql/queries";
import { createComment } from "../../graphql/mutations";

export const getAllCommentsApi = async () => {
  try {
    const apiData = await API.graphql({ query: listComments });
    if (apiData.data !== null) return apiData.data.listComments.items;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const getCommentsApi = async (movie_id) => {
  try {
    const apiData = await API.graphql({
      query: listComments,
      variables: { movie_id },
    });
    if (apiData.data !== null) return apiData.data.listComments.items;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const addCommentApi = async (comment) => {
  try {
    const apiData = await API.graphql({
      query: createComment,
      variables: { input: comment },
    });
    if (apiData.data !== null) return apiData.data.comment;
  } catch (err) {
    console.log(err);
  }

  return null;
};
