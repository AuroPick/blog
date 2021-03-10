import axios from "axios";

const url = "https://aykut-blog.herokuapp.com";

export const register = async ({ email, username, password }) => {
  try {
    const register = await axios.post(`${url}/users/register`, {
      email,
      username,
      password,
    });

    return register;
  } catch (error) {
    return {
      data: {
        message: { msg: "Bir hata oluştu", msgError: true },
        isAuthenticated: false,
      },
    };
  }
};

export const login = async ({ username, password }) => {
  try {
    const login = await axios.post(
      `${url}/users/login`,
      {
        username,
        password,
      },
      { withCredentials: true, credentials: "include" }
    );

    return login;
  } catch (error) {
    return {
      message: { msg: "Bir hata oluştu", msgError: true },
      data: { isAuthenticated: false },
    };
  }
};

export const logout = async () => {
  try {
    const logout = await axios.get(`${url}/users/logout`, {
      withCredentials: true,
      credentials: "include",
    });

    return logout;
  } catch (error) {
    return { message: { msg: "Bir hata oluştu", msgError: true } };
  }
};

export const admin = async () => await axios.get(`${url}/users/admin`);

export const isAuthenticated = async () => {
  try {
    const isAuthenticated = await axios.get(`${url}/users/authenticated`, {
      withCredentials: true,
      credentials: "include",
    });

    return isAuthenticated;
  } catch (error) {
    return {
      message: { msg: "Bir hata oluştu", msgError: true },
      data: { isAuthenticated: false },
    };
  }
};

export const getUsers = async () => {
  try {
    const getUsers = await axios.get(`${url}/users/get`, {
      withCredentials: true,
      credentials: "include",
    });

    return {
      getUsers,
      message: { msg: "Kullanıcılar getirildi", msgError: false },
    };
  } catch (error) {
    return {
      message: { msg: "Bir hata oluştu", msgError: true },
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const deleteUser = await axios.delete(`${url}/users/delete/${id}`, {
      withCredentials: true,
      credentials: "include",
    });

    return deleteUser;
  } catch (error) {
    return { message: { msg: "Bir hata oluştu", msgError: true } };
  }
};
