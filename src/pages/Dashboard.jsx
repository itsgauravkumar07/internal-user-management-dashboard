import { useState } from "react";
import { useAppContext } from "../context/AppProvider";

export default function Dashboard(){

    const { users, requests, currentRole } = useAppContext();
    
    const activeUsersCount = users.filter((user) => user.status === "Active").length;
    

    return(
        <div>
            {currentRole === "admin" 
            ? 
                <>
                    <div>
                        <div>{`Total users are : ${users.length}`}</div>
                        <div>{`Total active user : ${activeUsersCount}`}</div>
                    </div>
                </>
            :<><p>You are in member dashbaord</p></>}
        </div>
    )
}