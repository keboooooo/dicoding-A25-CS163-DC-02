import { useState, useEffect } from "react";
import {
  fetchTutorial,
  fetchUserPreferences,
  generateQuestions,
} from "../services/api";
import { DEFAULT_VALUES } from "../utils/constants";

export function useQuizData(tutorialId, userId) {
  const [questions, setQuestions] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch tutorial content
        const tutorialData = await fetchTutorial(tutorialId);

        // Fetch user preferences
        const prefsData = await fetchUserPreferences(userId);
        setPreferences(prefsData.data.preferences);

        // Generate questions from tutorial content
        const generatedQuestions = await generateQuestions(
          tutorialData.data.content
        );
        
        // Limit to maximum questions as per requirement
        setQuestions(generatedQuestions.slice(0, DEFAULT_VALUES.MAX_QUESTIONS));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [tutorialId, userId]);

  return { questions, preferences, loading, error };
}
