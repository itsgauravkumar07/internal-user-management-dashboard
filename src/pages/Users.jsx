import { useState } from "react";
import { useAppContext } from "../context/AppProvider";
import Modal from "../components/Modal";

export default function Users(){

    const { users, currentRole, setUsers } = useAppContext();
    const [isModal, setIsModal] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');

    function OpenModel(){
        setIsModal(!isModal);
    }

    function handleAdd(e){
        e.preventDefault();
        const newValue = {
                id: Date.now().toString(36),
                name: name,
                role: role,
                status: status
            };

        setUsers([...users, newValue]);
        OpenModel();
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
                        onClick={() => OpenModel()}>Add user</button>
                    :
                    <p>You have read-only access to users</p>
                }
            </div>
            
            {isModal && 
                <Modal 
                    isModal={isModal} 
                    onClose={OpenModel} >
                    <div className="px-8 py-6">

                         <h1 className="mb-5 text-lg font-medium">Add Users form</h1>
                         
                        <form
                            onSubmit={handleAdd} 
                            className="flex flex-col gap-2 ">
                            <div>
                                <label className="text-sm">Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Ravi kumar"
                                    className="border rounded px-2 py-1 w-full"
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </div>
                            

                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <label className="text-sm">Role</label>
                                    <select 
                                        className="border rounded px-3 mt-2 py-1 w-fit"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}>
                                        <option>Select an Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Member">Member</option>
                                    </select>
                                </div>

                                <div className="flex flex-col w-fit">
                                    <label className="text-sm">Status</label>
                                    <select 
                                        className="border rounded px-3 mt-2 py-1"
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}>
                                        <option>Select an Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <button className="mt-4 px-4 py-1 bg-green-400 rounded hover:bg-green-600 hover:text-white">Add</button>
                            
                        </form>
                    </div>
                   
            </Modal>
            }
            
           
        </section>
    )
}