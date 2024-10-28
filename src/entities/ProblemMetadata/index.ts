import { BaseProblemMetadata, ProblemMetadataModule } from "@/shared/types";
import { ProblemMetadataBJ, problemMetadataBJModule } from "./BJ";

export * as BJ from "./BJ";

export type ProblemMetadataComposite = ProblemMetadataBJ /* | ... */;

export const problemMetadataModuleComposite: ProblemMetadataModule<BaseProblemMetadata>[] =
  [problemMetadataBJModule];

export function findProblemMetadataModule(type: string) {
  return problemMetadataModuleComposite.find((x) => x.isTypeThis(type));
}
