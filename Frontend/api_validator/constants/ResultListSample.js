export const resultColumns = [
  { id: "result", label: "Result", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 170 },
  {
    id: "service",
    label: "Service",
    minWidth: 170,
  },
  {
    id: "path",
    label: "Path",
    minWidth: 170,
  },
  {
    id: "method",
    label: "Method",
    minWidth: 170,
  },
];

function createData(result, name, category, service, path, method) {
  return { result, name, category, service, path, method };
}

export const resultRows = [
  createData("Pass", "abc1", "SSAFY", "ssafy.com", "/user", "GET"),
  createData("Pass", "abc2", "SSAFY", "ssafy.com", "/user", "POST"),
  createData("Pass", "abc3", "SSAFY", "ssafy.com", "/user", "GET"),
  createData("Pass", "abc4", "SSAFY", "ssafy.com", "/user", "POST"),
  createData("Pass", "abc5", "SSAFY", "ssafy.com", "/user", "GET"),
  createData("Pass", "abc6", "SSAFY", "ssafy.com", "/user", "GET"),
  createData("Pass", "abc7", "SSAFY", "ssafy.com", "/user", "POST"),
  createData("Pass", "abc8", "SSAFY", "ssafy.com", "/user", "GET"),
  createData("Fail", "abc9", "SSAFY", "ssafy.com", "/admin", "POST"),
  createData("Fail", "abc10", "SSAFY", "ssafy.com", "/admin", "GET"),
  createData("Fail", "abc11", "SSAFY", "ssafy.com", "/admin", "GET"),
  createData("Fail", "abc12", "SSAFY", "ssafy.com", "/admin", "POST"),
  createData("Fail", "abc13", "SSAFY", "ssafy.com", "/admin", "GET"),
  createData("Fail", "abc14", "SSAFY", "ssafy.com", "/admin", "POST"),
  createData("Fail", "abc15", "SSAFY", "ssafy.com", "/admin", "GET"),
  createData("Fail", "abc16", "SSAFY", "ssafy.com", "/admin", "GET"),
  createData("Fail", "abc17", "SSAFY", "ssafy.com", "/admin", "POST"),
  createData("Fail", "abc18", "SSAFY", "ssafy.com", "/admin", "GET"),
  createData("Fail", "abc19", "SSAFY", "ssafy.com", "/admin", "POST"),
  createData("Fail", "abc20", "SSAFY", "ssafy.com", "/admin", "GET"),
];
