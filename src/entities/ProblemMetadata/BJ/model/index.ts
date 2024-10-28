import { BaseProblemMetadata } from "@/shared/types";

export interface ProblemMetadataBJ extends BaseProblemMetadata {
  type: "bj";
  number: number;
  title: string;
}

export const isTypeThis = (type: string) => type === "bj";
