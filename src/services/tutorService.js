import api from "../api/axios";

export const askTutor = async (question) => {
  const response = await api.post(
    "/ai/tutor",
    { question }
  );

  return response.data;
};