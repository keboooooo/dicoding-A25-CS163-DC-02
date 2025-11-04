import { API_BASE_URL } from "../utils/constants";
import { getMockQuestions } from "../data/mockQuestion";

export async function fetchTutorial(tutorialId) {
  if (!tutorialId) {
    throw new Error("Tutorial ID is required");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/tutorials/${tutorialId}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch tutorial: ${response.status} ${errorData.message || response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tutorial:", error);
    throw error;
  }
}

export async function fetchUserPreferences(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/preferences`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch preferences: ${response.status} ${errorData.message || response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    throw error;
  }
}

export async function generateQuestions(tutorialContent) {
  if (!tutorialContent) {
    throw new Error("Tutorial content is required");
  }
  try {
    // TODO: Integrate with LLM API to generate questions from content
    // For now, return mock data
    return await getMockQuestions();
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}
