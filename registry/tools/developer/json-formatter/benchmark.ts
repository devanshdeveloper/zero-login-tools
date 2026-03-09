export const benchmarks = [
  {
    name: "Format 10KB JSON",
    inputSize: 10240,
    expectedMs: 5,
  },
  {
    name: "Minify 1MB JSON",
    inputSize: 1048576,
    expectedMs: 30,
  },
];
