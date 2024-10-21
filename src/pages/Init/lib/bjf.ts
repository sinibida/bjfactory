
import { installTemplates } from "@/shared/api/fs/template";
import { BJFConfig } from "@/features/config/model/BJFConfig";
import { InitBJFParams, fromInitBJFParamsToBJFConfig } from "../model/InitBJFParams";
import { configApi } from "@/features/config";

export async function initBJF(props: InitBJFParams) {
  const {selectedLanguages} = props;
  await installTemplates(selectedLanguages);
  const config: BJFConfig = fromInitBJFParamsToBJFConfig(props);
  await configApi.writeBJFConfig(config, props.rootDir);
}

