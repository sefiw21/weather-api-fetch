
export function getElementSafe<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`DOM Error: Expected element with ID '${id}' but it was not found.`);
  }
  return element as T;
}