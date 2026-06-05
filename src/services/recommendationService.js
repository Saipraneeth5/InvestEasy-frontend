import api from "../api/axios";

export const generateRecommendation = async () => {
  const response = await api.post(
    "/recommendations/generate"
  );

  return response.data;
};

export const getLatestRecommendation = async () => {
  const response = await api.get(
    "/recommendations/latest"
  );

  return response.data;
};

export const getRecommendations = async () => {
  const response = await api.get(
    "/recommendations"
  );

  return response.data;
};