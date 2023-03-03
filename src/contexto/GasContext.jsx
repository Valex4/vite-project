import { createContext,useContext,useState } from "react";
export const GasContext = createContext();
export const useGas=()=>{
 const context=useContext(GasContext);
 if(!context){
    throw new Error("No esta dentro de TaskContextProvider")
 }
 return context;
}

export const GAsContextProvider = ({ children }) => {
    const [gas, setGas] = useState([]);
  return (
    <GasContext.Provider value={{gas,setGas}}>
      {children}
    </GasContext.Provider>
  );
};