import { installTemplates } from "@/shared/api/fs/template";
import { FactoryConfig } from "@/entities/Factory/model/BJFConfig";
import {
  InitBJFParams,
  fromInitBJFParamsToBJFConfig,
} from "../model/InitBJFParams";
import { configApi } from "@/entities/Factory";

export async function initBJF(props: InitBJFParams) {
  const { selectedLanguages } = props;
  await installTemplates(selectedLanguages);
  const config: FactoryConfig = fromInitBJFParamsToBJFConfig(props);
  await configApi.writeFactoryJson(config, props.rootDir);
}
