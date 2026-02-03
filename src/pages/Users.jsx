import { useAppContext } from "../context/AppProvider";

export default function Users(){

    const { users } = useAppContext();

    return(
        <section>
            <header className="bg-blue-300 px-5 py-2">
                <h1 className="text-2xl font-medium">Users</h1>
                <p className="text-sm">Manage and view users in the system</p>
            </header>

            <div className="mt-4 px-5">
                <ul>
                    {users.map((user) => (
                    <li 
                        key={user.id}>
                            {user.name} -
                            {user.role} -
                            {user.status}
                    </li>
                    ))}
                </ul>
            </div>
            
           
        </section>
    )
}