
export function getElementSafe<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`DOM Error: Expected element with ID '${id}' but it was not found.`);
  }
  return element as T;
}

export const uiElements = {
  list:    getElementSafe<HTMLUListElement>("weatherList"),
  loadBtn: getElementSafe<HTMLButtonElement>("loadMoreBtn"),
  lat:     getElementSafe<HTMLSpanElement>("lat"),
  lon:     getElementSafe<HTMLSpanElement>("lon"),
  tz:      getElementSafe<HTMLSpanElement>("tz"),
  elev:    getElementSafe<HTMLSpanElement>("elev"),
};