import { useState, useEffect } from "react";

export function useQuizState(storageKey, questions) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  // Load saved state on mount
  useEffect(() => {
    async function loadState() {
      if (!window.storage) {
        console.error("Storage is not available");
        return;
      }
      try {
        const savedState = await window.storage.get(storageKey);
        if (savedState) {
          try {
            const state = JSON.parse(savedState.value);
            if (state && typeof state === 'object') {
              setAnswers(state.answers || {});
              setCurrent(state.current || 0);
            }
          } catch (error) {
            console.error("Failed to parse saved state:", error);
          }
        }
      } catch (error) {
        console.error("Failed to load saved state:", error);
      }
    }

    if (questions.length > 0) {
      loadState();
    }
  }, [storageKey, questions.length]);

  // Save state whenever it changes
  useEffect(() => {
    async function saveState() {
      if (!window.storage) {
        console.error("Storage is not available");
        return;
      }
      if (questions.length > 0) {
        try {
          const stateToSave = { answers, current };
          await window.storage.set(
            storageKey,
            JSON.stringify(stateToSave),
            false
          );
        } catch (error) {
          console.error("Failed to save state:", error);
        }
      }
    }

    saveState();
  }, [answers, current, questions.length, storageKey]);

  const handleSelect = (id, answer) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const handleReset = async () => {
    if (!window.storage) {
      console.error("Storage is not available");
      return;
    }
    try {
      await window.storage.delete(storageKey, false);
      setAnswers({});
      setCurrent(0);
    } catch (error) {
      console.error("Failed to reset:", error);
      // Still reset the state even if storage deletion fails
      setAnswers({});
      setCurrent(0);
    }
  };

  const goToNext = () => {
    setCurrent((p) => Math.min(p + 1, questions.length - 1));
  };

  const goToPrevious = () => {
    setCurrent((p) => Math.max(p - 1, 0));
  };

  return {
    current,
    answers,
    handleSelect,
    handleReset,
    goToNext,
    goToPrevious,
  };
}
