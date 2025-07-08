// Utility for localStorage CRUD
export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const updateItem = (key, updater) => {
  const current = getItem(key);
  setItem(key, updater(current));
}; 