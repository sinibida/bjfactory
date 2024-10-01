import http from "../client";

export async function getProblemInfo(problemId: number) {
  const response = await http.get("/problem/show", {
    params: {
      problemId,
    },
  });

  return response.data;
}
