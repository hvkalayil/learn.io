import { useEffect } from "preact/hooks";

export const TokenPersistor = ({ token }: { token: string }) => {
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  // deno-lint-ignore jsx-no-useless-fragment
  return <></>;
};
