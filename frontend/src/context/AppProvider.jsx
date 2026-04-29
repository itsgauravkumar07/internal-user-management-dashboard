import { createContext, useContext, useEffect } from "react";
import { useState } from "react"

const AppContext = createContext(null);

export default function AppProvider({ children }){
     
    const [users, setUsers] = useState([]);
    const [authUser, setAuthUser] = useState(getAuthUser());

    function getAuthUser(){
        const token = localStorage.getItem("token");
        if(!token) return null;

        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch {
            return null;
        }
    }

    useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/app-users", {
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => setUsers(data));
    }, []);

    async function addUser(newUser) {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/app-users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newUser)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        // update global state
        setUsers(prev => [...prev, data.user]);
    }

    async function updateUser(id, updatedData) {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:4000/app-users/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        // update global state
        setUsers(prev =>
            prev.map(user =>
            user.id === id ? data.user : user
            )
        );
    }

    async function deleteUser(id) {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:4000/app-users/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        // update global state
        setUsers(prev => prev.filter(user => user.id !== id));
    }

    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) return;

        fetch("http://localhost:4000/requests", {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
            if (!res.ok) throw new Error("Failed to fetch requests");
            return res.json();
        })
            .then(data => setRequests(data))
            .catch(err => {
                console.log(err);
                setRequests([]); // fallback safe
            });

    }, []);

    async function addRequest(newRequest) {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/requests", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newRequest)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setRequests(prev => [...prev, data.request]);
    }

    async function updateRequest(id, status) {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:4000/requests/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setRequests(prev =>
            prev.map(r => (r.id === id ? data.request : r))
        );
    }

    return(
        <AppContext.Provider 
            value={{
                users,
                setUsers,
                requests,
                addRequest,
                updateRequest,
                getAuthUser,
                addUser,
                updateUser,
                deleteUser
            }}>
                {children}                    
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext);
}