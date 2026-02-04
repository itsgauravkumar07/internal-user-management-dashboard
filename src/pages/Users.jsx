import { useAppContext } from "../context/AppProvider";

export default function Users(){

    const { users, currentRole } = useAppContext();

    return(
        <section>
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
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border">{user.name}</td>
                                <td className="border">{user.role}</td>
                                <td className="border">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        
                {currentRole === "admin" 
                    ? 
                    <button className="px-3 py-1 bg-green-400 rounded">Add user</button>
                    :
                    <p>You have read-only access to users</p>
                }
            </div>
            
           
        </section>
    )
}