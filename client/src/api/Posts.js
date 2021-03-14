import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const createPost = async ({ title, message, creator, specialPost }) => {
  try {
    const createPost = await axios.post(
      `${url}/posts/create`,
      {
        title,
        message,
        creator,
        specialPost,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );

    return createPost;
  } catch (error) {
    return { message: { msg: "Bir hata oluştu", msgError: true } };
  }
};

export const getPosts = async () => {
  try {
    const getPosts = await axios.get(`${url}/posts/posts`, {
      withCredentials: true,
      credentials: "include",
    });

    return getPosts;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const deletePost = await axios.delete(`${url}/posts/delete/${id}`, {
      withCredentials: true,
      credentials: "include",
    });

    return deletePost;
  } catch (error) {
    return { data: { message: { msg: "Bir hata oluştu", msgError: true } } };
  }
};

export const updatePost = async (id, post) => {
  try {
    const updatePost = await axios.patch(`${url}/posts/update/${id}`, post, {
      withCredentials: true,
      credentials: "include",
    });

    return updatePost;
  } catch (error) {
    return { data: { message: { msg: "Bir hata oluştu", msgError: true } } };
  }
};
