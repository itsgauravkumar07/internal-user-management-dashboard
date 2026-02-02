import { createContext, useContext } from "react";
import { useState } from "react"

const ppContext = createContext(null);

export default function AppContext({ children }){
     
    const [currentRole, setCurrentRole] = useState("");
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);

    return(
        <AppContext.Provider 
            value={{
                currentRole,
                setCurrentRole,
                users,
                setUsers,
                requests,
                setRequests,
            }}>
                {children}                    
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext);
}