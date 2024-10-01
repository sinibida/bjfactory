import { keywordCheck } from "./search"

test("Problem Folder Search Algorithm", () => {
  const f = keywordCheck;
  expect(f("2042-cpp-구간-합-구하기", "2042")).toBe(true);
  expect(f("2042-cpp-구간-합-구하기", "2042-cpp")).toBe(true);
})