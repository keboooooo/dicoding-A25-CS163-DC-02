import { DEFAULT_VALUES, QUERY_PARAMS } from './constants';

export function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    tutorialId: urlParams.get(QUERY_PARAMS.TUTORIAL_ID) || DEFAULT_VALUES.TUTORIAL_ID,
    userId: urlParams.get(QUERY_PARAMS.USER_ID) || DEFAULT_VALUES.USER_ID,
  };
}