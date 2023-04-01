export function jsonToRow(json) {
  const rows = Object.entries(json).map(([key, value]) => ({ key, value }));
  return rows;
}
