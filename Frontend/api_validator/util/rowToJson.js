export default function rowToJson(rows) {
  const obj = rows.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});

  return obj;
}
