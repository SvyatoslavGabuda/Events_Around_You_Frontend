import { createContext, useState, ReactNode } from "react";

export interface IAuthData {
  accessToken: string | null;
  roles: string[] | null;
  tokenType: string | null;
  username: string | null;
}

const AuthContext = createContext<{
  auth: IAuthData;
  setAuth: React.Dispatch<React.SetStateAction<IAuthData>>;
}>({
  auth: { accessToken: null, roles: null, tokenType: null, username: null },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<IAuthData>({
    accessToken: "",
    roles: [],
    tokenType: "",
    username: "",
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
