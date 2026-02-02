import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppProvider"

export default function RoleSelect(){

    const { setCurrentRole } = useAppContext();
    const navigate = useNavigate();

    function setAdmin(){
        setCurrentRole("admin");
        navigate("/dashboard");
    }

    function setMember(){
        setCurrentRole("member");
        navigate("/dashboard")
    }
    return(
        <section  className=" flex justify-center items-center min-h-screen gap-5">
            <div 
                className="border border-gray-500 px-10 py-10 rounded"
                onClick={setAdmin}
                >
                <h1>View as admin</h1>
            </div>

             <div 
                className="border border-gray-500 px-10 py-10 rounded"
                onClick={setMember}
                >
                <h1>View as Member</h1>
            </div>
        </section>
    )
}