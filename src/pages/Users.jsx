import { useState } from "react";
import { useAppContext } from "../context/AppProvider";
import Modal from "../components/Modal";

export default function Users(){

    const { users, currentRole } = useAppContext();
    const [isModal, setIsModal] = useState(false);

    function handleAddUser(){
        setIsModal(!isModal);
        console.log("click");
    }

    return(
        <section className="">
            <header className="bg-blue-300 px-5 py-2">
                <h1 className="text-2xl font-medium">Users</h1>
                <p className="text-sm">Manage and view users in the system</p>
            </header>

            <div className="mt-4">
                <table className="">
                    <thead className="border ">
                        <tr className="">
                            <th className="border">Name</th>
                            <th className="border">Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-5">{user.name}</td>
                                <td className="border px-5">{user.role}</td>
                                <td className="border px-5">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        
                {currentRole === "admin" 
                    ? 
                    <button 
                        className="px-3 mt-5 py-1 bg-green-400 rounded"
                        onClick={() => handleAddUser()}>Add user</button>
                    :
                    <p>You have read-only access to users</p>
                }
            </div>
            
            {isModal && 
                <Modal 
                    isModal={isModal} 
                    onClose={handleAddUser} 
                    className="">
                    <h1>this is modal</h1>
                    <button>Click me</button>
            </Modal>
            }
            
           
        </section>
    )
}