import { ProblemMetadataModule } from "@/shared/types";
import { getFromKeyword } from "./api";
import { isTypeThis, ProblemMetadataBJ } from "./model";
import { metadataToProblemData } from "./lib";

export const problemMetadataBJModule: ProblemMetadataModule<ProblemMetadataBJ> =
  {
    isTypeThis,
    getFromKeyword,
    metadataToProblemData,
  };

export { ProblemMetadataBJ } from "./model";
