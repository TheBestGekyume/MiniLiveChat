import api from "./api";

interface UserData {
  username?: string;
  email?: string;
  password?: string;
}

export const getUser = async (id: string) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: UserData) => {
  const response = await api.put(`/user/${id}`, data);
  return response.data;
};

export const registerUser = async (data: UserData) => {
  const response = await api.post("/user", data);
  return response.data;
};

export const loginUser = async (data: UserData) => {
  const response = await api.post("/login", data);
  return response.data;
};
