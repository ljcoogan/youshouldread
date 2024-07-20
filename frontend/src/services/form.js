export function getJsonFromForm(e) {
  const formData = new FormData(e.target);
  return Object.fromEntries(formData.entries());
}
