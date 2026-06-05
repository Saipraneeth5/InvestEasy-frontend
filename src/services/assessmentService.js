import api from "../api/axios";

export const createAssessment = async (data) => {
  const response = await api.post(
    "/assessments",
    data
  );

  return response.data;
};

export const getLatestAssessment = async () => {
  const response = await api.get(
    "/assessments/latest"
  );

  return response.data;
};

export const getAssessments = async () => {
  const response = await api.get(
    "/assessments"
  );

  return response.data;
};