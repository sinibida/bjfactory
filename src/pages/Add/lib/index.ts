import { findProblemMetadataModule } from "@/entities/ProblemMetadata";
import { BaseProblemMetadata } from "@/shared/types";

const separator = ":";
export function splitProblemString(problem: string): {
  type: string | null;
  keyword: string;
} {
  const split = problem.split(separator);

  if (split.length > 2) {
    throw Error("Unknown problem format: " + problem);
  }

  if (split.length == 1) {
    return {
      type: null,
      keyword: problem,
    };
  } else {
    return {
      type: split[0],
      keyword: split[1],
    };
  }
}

export function rawNameToId(name: string) {
  let ret = name;

  ret = ret.replace(/\s/g, "-");

  return ret;
}

export async function fetchProblemData(problem: {
  type: string | null;
  keyword: string;
}): Promise<{
  problemId: string;
  name: string;
  metadata: BaseProblemMetadata | null;
}> {
  if (problem.type !== null) {
    const metadataModule = findProblemMetadataModule(problem.type);

    if (metadataModule === undefined) {
      throw Error("Unknown problem type.");
    }

    const metadata = await metadataModule.getFromKeyword(problem.keyword);

    const problemData = metadataModule.metadataToProblemData(metadata);

    return {
      name: problemData.name,
      problemId: problemData.id,
      metadata: metadata,
    };
  } else {
    return {
      name: problem.keyword,
      problemId: rawNameToId(problem.keyword),
      metadata: null,
    };
  }
}

export function getFolderName(problemId: string, lang: string) {
  return `${problemId}-${lang}`;
}
