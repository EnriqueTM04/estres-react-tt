import { createContext } from "react";

const VidaZenContext = createContext();

const VidaZenProvider = ({children}) => {
    return (
        <VidaZenContext.Provider
            value={{

            }}
        >
            {children}
        </VidaZenContext.Provider>
    )
}

export { VidaZenProvider };
export default VidaZenContext;