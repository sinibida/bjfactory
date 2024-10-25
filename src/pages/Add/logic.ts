import { getProblemInfo } from "@/shared/api/solvecac/api/problem";
import { askProblemName } from "./ui";

export function processProblemName(problemName: string) {
  let ret = problemName;

  ret = ret.replace(/\s/g, "-");

  return ret;
}

export function getFolderName({ id, title }: { id: number; title: string }) {
  const processed = processProblemName(title);

  return `./${id}-${processed}`;
}

async function getProblemFolderNameRaw(problem: string) {
  const problemId = parseInt(problem, 10);
  if (Number.isNaN(problemId)) {
    const { folderName, response } = await askProblemName();
    return {
      problemName: response,
      folderName,
    };
  } else {
    const response = await getProblemInfo(problemId);

    const problemName = response.titleKo as string;

    const folderName = getFolderName({
      id: problemId,
      title: problemName,
    });

    return {
      problemName,
      folderName,
    };
  }
}

export async function getProblemFolderName(problem: string, lang: string) {
  const { problemName, folderName } = await getProblemFolderNameRaw(problem);

  return {
    problemName,
    folderName: folderName + "-" + lang,
  };
}
