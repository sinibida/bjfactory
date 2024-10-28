import { getProblemInfo } from "@/shared/api/solvecac/api/problem";
import { ProblemMetadataBJ } from "../model";

export async function getFromKeyword(
  keyword: string,
): Promise<ProblemMetadataBJ> {
  const problemId = parseInt(keyword);

  if (isNaN(problemId)) {
    throw Error("Please enter a valid integer for BOJ Problem Id.");
  }

  const response = await getProblemInfo(problemId);

  const problemName = response.titleKo as string;

  return {
    number: problemId,
    title: problemName,
    type: "bj",
  };
}
