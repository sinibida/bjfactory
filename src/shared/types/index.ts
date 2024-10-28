import { Command } from "commander";

// TODO: Split Types

export interface CommandModule {
  next: (program: Command) => void;
}

export interface BaseProblemMetadata {
  type: string;
}

export interface ProblemMetadataModule<MD extends BaseProblemMetadata> {
  isTypeThis(type: string): boolean;
  getFromKeyword(keyword: string): Promise<MD>;
  metadataToProblemData(metadata: MD): { id: string; name: string };
}
