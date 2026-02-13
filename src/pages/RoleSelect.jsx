import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppProvider"

export default function RoleSelect(){

    const { setCurrentRole, setCurrentUserId, users } = useAppContext();
    const navigate = useNavigate();

    function setAdmin(){
        setCurrentRole("admin");
        setCurrentUserId(users[1].id);
        navigate("/dashboard");
    }

    function setMember(){
        setCurrentRole("member");
        setCurrentUserId(users[1].id);
        navigate("/dashboard")
    }
    return(
        <section  className=" flex justify-center items-center px-10 flex-col min-h-screen gap-5 bg-slate-900">

            <div className="text-center max-w-2xl space-y-6 mb-10">
                <p className="text-blue-800 font-bold">DASHBOARD DEMO</p>
                <h1 className="text-5xl font-black text-white">Select a Role to Preview</h1>
                <p className="text-slate-300 text-2xl">Experience the dashboard from different perspectives. Choose a role below to enter the demo environment.</p>
            </div>
            <div className="flex justify-center items-center gap-1 md:flex-col w-full">
                <div 
                className="border border-gray-500 px-10 py-10 rounded-lg h-80 w-full"
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
            </div>
            
        </section>
    )
}