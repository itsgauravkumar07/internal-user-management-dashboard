import { createContext, useContext } from "react";
import { useState } from "react"

const AppContext = createContext(null);

export default function AppProvider({ children }){
     
    const [currentRole, setCurrentRole] = useState("admin");
    const [currentUserId, setCurrentUserId] = useState(null);

    const [users, setUsers] = useState([
        {
            id: crypto.randomUUID(),
            name: "Ram",
            role: "Admin",
            status: "Active"
        },
        {
            id: crypto.randomUUID(),
            name: "Adrash",
            role: "Member",
            status: "Active"
        }
    ]);

    const [requests, setRequests] = useState([
        
        {
            id: crypto.randomUUID(),
            userId: users[0]?.id,
            type: "role_change",
            requestedValue: "admin",
            status: "pending",
            createdAt: Date.now()
        },
        {
            id: crypto.randomUUID(),
            userId: users[1]?.id,
            type: "role_change",
            requestedValue: "admin",
            status: "pending",
            createdAt: Date.now()
        }
    ]);

    return(
        <AppContext.Provider 
            value={{
                currentRole,
                setCurrentRole,
                users,
                setUsers,
                requests,
                setRequests,
                currentUserId,
                setCurrentUserId,
            }}>
                {children}                    
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext);
}