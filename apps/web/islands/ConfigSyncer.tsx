export const ConfigSyncer = ({ config }: { config: { API_URL: string } }) => {
  localStorage.setItem("API_URL", config.API_URL);
  // deno-lint-ignore jsx-no-useless-fragment
  return <></>;
};
