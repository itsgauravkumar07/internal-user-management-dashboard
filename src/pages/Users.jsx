import { useAppContext } from "../context/AppProvider";

export default function Users(){

    const { users } = useAppContext();

    return(
        <section>
           

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