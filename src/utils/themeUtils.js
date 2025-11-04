import { THEME_OPTIONS, LAYOUT_OPTIONS, FONT_SIZE_OPTIONS } from "./constants";

export function getThemeClasses(preferences) {
  return {
    isDarkTheme: preferences?.theme === THEME_OPTIONS.DARK,
    isFullWidth: preferences?.layoutWidth === LAYOUT_OPTIONS.FULLWIDTH,
    isLargeFont: preferences?.fontSize === FONT_SIZE_OPTIONS.LARGE,
  };
}

export function getContainerClasses({ isDarkTheme, isFullWidth, isLargeFont }) {
  const themeClasses = isDarkTheme
    ? "bg-gray-900 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-200";

  const widthClasses = isFullWidth ? "max-w-full" : "max-w-2xl";

  const fontClasses = isLargeFont ? "text-lg" : "text-base";

  return `min-h-screen flex items-center justify-center p-4 ${fontClasses} w-full ${widthClasses} rounded-xl overflow-hidden shadow border ${themeClasses} px-4 py-6`;
}
