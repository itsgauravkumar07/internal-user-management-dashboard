import { createContext, useContext } from "react";
import { useState } from "react"

const AppContext = createContext(null);

export default function AppProvider({ children }){
     
    const [currentRole, setCurrentRole] = useState("");

    const [users, setUsers] = useState([
    {
        id: 1,
        name: "Admin User",
        role: "admin",
        status: "active"
    },
    {
        id: 2,
        name: "Member User",
        role: "member",
        status: "active"
    }

]);

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