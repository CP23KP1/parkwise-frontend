import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const BASE_PATH: string = publicRuntimeConfig.BASE_PATH;
