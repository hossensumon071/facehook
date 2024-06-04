import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.user ? "User logged in" : "User Logged Out"
  );
  return useContext(AuthContext);
};

export default useAuth;
