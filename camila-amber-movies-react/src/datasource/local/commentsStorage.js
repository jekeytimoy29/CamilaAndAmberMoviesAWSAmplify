import { set, add } from "./localStorage";

export async function setComments(comments) {
  return await set("comments", comments);
}

export async function addComment(comment) {
  return await add("comments", comment);
}

export async function getMovieComments(movie_id) {
  let comments = await localStorage.getItem("comments");
  if (!comments) {
    comments = [];
    await set("comments", comments);

    return comments;
  }

  comments = JSON.parse(comments);
  return comments.filter((comment) => comment.movie_id === movie_id);
}
