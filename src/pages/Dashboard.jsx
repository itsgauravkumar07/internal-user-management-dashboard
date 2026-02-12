import { useState } from "react";
import { useAppContext } from "../context/AppProvider";

export default function Dashboard(){

    const { users, requests, currentRole, currentUserId } = useAppContext();
    
    const activeUsersCount = users.filter((user) => user.status === "Active").length;
    const adminCount = users.filter((user) => user.role === "admin").length;
    const pendingReqCount = requests.filter((req) => req.status === "pending").length;
    
    const currentUser = users.find(u => u.id === currentUserId);

    return(
        <div>
            {currentRole === "admin" 
            ? 
                <>
                    <div>
                        <div>{`Total users are : ${users.length}`}</div>
                        <div>{`Total active user : ${activeUsersCount}`}</div>
                        <div>{`Total admin count : ${adminCount}`}</div>
                        <div>{`Total pending request : ${pendingReqCount}`}</div>
                    </div>
                </>
            : 
                <>
                    <div>
                        <div>{`Your role is : ${currentUser?.role}`}</div>
                        <div>{`Your Current status is : ${currentUser?.status}`}</div>
                        
                    </div>
                </>
            }
        </div>
    )
}