import { useState } from "react";
import { useAppContext } from "../context/AppProvider";

export default function Dashboard(){

    const { users, requests, currentRole } = useAppContext();
    
    const activeUsersCount = users.filter((user) => user.status === "Active").length;
    const adminCount = users.filter((user) => user.role === "admin").length;
    const pendingReqCount = requests.filter((req) => req.status === "pending").length;
    return(
        <div>
            {currentRole === "admin" 
            ? 
                <>
                    <div>
                        <div>{`Total users are : ${users.length}`}</div>
                        <div>{`Total active user : ${activeUsersCount}`}</div>
                        <div>{`Toatl admin count : ${adminCount}`}</div>
                        <div>{`Toatl pending request : ${pendingReqCount}`}</div>
                    </div>
                </>
            : 
                <>
                    <div>
                        <div>{}</div>
                    </div>
                </>
            }
        </div>
    )
}