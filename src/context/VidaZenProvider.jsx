import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import dayjs from "dayjs";

const VidaZenContext = createContext();

const VidaZenProvider = ({ children }) => {

  return (
    <VidaZenContext.Provider
      value={{

      }}
    >
      {children}
    </VidaZenContext.Provider>
  );
};

export { VidaZenProvider };
export default VidaZenContext;
