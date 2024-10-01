import { keywordCheck as f } from "./search"

test("Simple folder name", () => {
  expect(f("2042-cpp-구간-합-구하기", "2042")).toBe(true);
  expect(f("2042-cpp-구간-합-구하기", "2042-cpp")).toBe(true);
})

test("Basename Only", () => {
  expect(f("folder/2042-cpp-구간-합-구하기", "2042-cpp")).toBe(true);
})