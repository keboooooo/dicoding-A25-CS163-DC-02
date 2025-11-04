export const API_BASE_URL =
  "https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api";

export const STORAGE_KEYS = {
  QUIZ_STATE: (userId, tutorialId) => `quiz_state:${userId}:${tutorialId}`,
  USER_PREFERENCES: (userId) => `user_preferences:${userId}`,
};

export const DEFAULT_VALUES = {
  TUTORIAL_ID: "default_tutorial",
  USER_ID: "guest_user",
  MAX_QUESTIONS: 3,
};

export const THEME_OPTIONS = {
  DARK: "dark",
  LIGHT: "light",
};

export const LAYOUT_OPTIONS = {
  FULLWIDTH: "fullwidth",
  DEFAULT: "default",
};

export const FONT_SIZE_OPTIONS = {
  LARGE: "large",
  DEFAULT: "default",
};

export const QUERY_PARAMS = {
  TUTORIAL_ID: "tutorial_id",
  USER_ID: "user_id",
};
