import React, { createContext } from 'react';
import {Projects} from "../all_projects"

export const ShopContext= createContext(null);

export const ShopContextProvider = (props) => {
    const contextValue = {Projects}
  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
    
  )
}

export default ShopContextProvider;
