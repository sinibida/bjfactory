import { fromInitBJFParamsToBJFConfig } from "../../impls/BJFConfig/fromInitBJFParams";
import { BJFConfig, InitBJFParams } from "../../types";
import { writeBJFConfig } from "../fs/config";
import { installTemplates } from "../fs/template";

export async function initBJF(props: InitBJFParams) {
  const {selectedLanguages} = props;
  await installTemplates(selectedLanguages);
  const config: BJFConfig = fromInitBJFParamsToBJFConfig(props);
  await writeBJFConfig(config, props.rootDir);
}

