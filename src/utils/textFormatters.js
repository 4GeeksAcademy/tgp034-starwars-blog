export function capitalizeFirst(str = "") {
  if (typeof str !== 'string' || str.length === 0) return "";
  if (str === "n/a") return "N/A";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
