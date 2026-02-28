import { createContext, useContext, useEffect } from "react";
import { useState } from "react"

const AppContext = createContext(null);

export default function AppProvider({ children }){
     
    const DEMO_USERS = [
        {
            id: "demo-admin",
            name: "Demo Admin",
            role: "Admin",
            status: "Active",
            isDemo: true
        },
        {
            id: "demo-member",
            name: "Demo Member",
            role: "Member",
            status: "Active",
            isDemo: true
        }
        ];
        
    const [currentRole, setCurrentRole] = useState("admin");
    const [currentUserId, setCurrentUserId] = useState(null);

    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('users');
        return saved ? JSON.parse(saved) : DEMO_USERS;
    });

    useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
    }, [users]);

    const [requests, setRequests] = useState(() => {
        const req = localStorage.getItem('req');
        if(req){
            return JSON.parse(req);
        }else {
            return [{
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
                }];
            }
        }
    );

    useEffect(() => {
        localStorage.setItem('req', JSON.stringify(requests))
    }, [requests]);
    
   

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