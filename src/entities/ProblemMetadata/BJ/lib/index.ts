import { ProblemMetadataBJ } from "../model";

export function metadataToProblemData(metadata: ProblemMetadataBJ): {
  id: string;
  name: string;
} {
  return {
    id: "bj-" + metadata.number,
    name: metadata.title,
  };
}
