const BASE_PATH = process.env.NEXT_PUBLIC_BASEPATH;
export const getPublicBasePath = (path: string) => {
  return `${BASE_PATH}${path}`;
};