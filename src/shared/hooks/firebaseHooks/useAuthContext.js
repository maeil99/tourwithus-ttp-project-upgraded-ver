import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be inside AuthContextProvider");
  }
  console.log("Context: ", context);
  return context;
};

