import { processProblemName } from "."

test('Problem Name Conversion Test', () => {
  expect(processProblemName("부분 합 구하기")).toEqual('부분-합-구하기')
})
