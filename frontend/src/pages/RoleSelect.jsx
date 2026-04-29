import { useNavigate } from "react-router-dom";
import { MdOutlineSecurity, MdOutlinePerson2 } from "react-icons/md";
import { useEffect } from "react";

export default function RoleSelect(){

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            navigate("/dashboard");
        }
    }, []);
    

    const handleLogin = async (email) => {
        try {
            const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password: "123456"
            })
        });

        const data = await res.json();

        if (!res.ok) {
        alert(data.message);
        return;
        }

        localStorage.setItem("token", data.token);
        navigate("/dashboard");

        } catch (err) {
            console.log("Login error:", err);
        }
    };

    return(
        <section  className="max-w-8xl flex justify-center items-center px-10 flex-col min-h-screen bg-slate-900">

            {/* Header Section */}
            <div className="text-center max-w-2xl space-y-4 mb-10 mt-10">
                <p className="text-blue-800 font-bold text-sm">DASHBOARD DEMO</p>
                <h1 className="text-4xl md:text-5xl font-black text-white">Select a Role to Preview</h1>
                <p className="text-slate-400 text-lg font-medium">Experience the dashboard from different perspectives. Choose a role below to enter the demo environment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mb-10">
                {/* Card 01 : View as admin*/}
                <div  
                    className="cursor-pointer border border-slate-400/20 px-8 py-5 rounded-2xl bg-slate-800/80 hover:border-blue-500/50"
                    onClick={() => handleLogin("admin@test.com")}>

                    {/* Icon design */}
                    <div className="bg-blue-800/20 w-fit rounded-2xl py-4 px-3 mb-5 ">
                        <MdOutlineSecurity className="h-10 w-10 text-blue-500/70"/>
                    </div>

                    {/* Card details */}
                    <h1 className="text-2xl font-bold text-white mb-5">View as Admin</h1>
                    <p className="text-slate-300  mb-5">Full access to all system settings. Manage users, configure permissions, and oversee access requests across the organizations.</p>
                    <p className="text-blue-600 font-bold mb-2 text-sm">Login as Admin</p>
                </div>
                

                {/* Card 02 :View as member */}
                <div 
                    className="cursor-pointer border border-slate-400/20 px-8 py-5 rounded-2xl bg-slate-800/80 hover:border-blue-500/50"
                    onClick={() => handleLogin("member@test.com")}>

                    {/* Icons design */}
                    <div className="bg-blue-800/20 w-fit rounded-2xl py-4 px-3 mb-5 ">
                        <MdOutlinePerson2 className="h-10 w-10 text-blue-500/70"/>
                    </div>

                    {/* Card details */}
                    <h1 className="text-2xl font-bold text-white mb-5">View as Member</h1>
                    <p className="text-slate-300 mb-5">Standard user access. View directory, update personal profile, and submit requests for new resource access.</p>
                    <p className="text-blue-600 font-bold mb-2 text-sm">Login as Member</p>
                </div>
                
            </div>
            
        </section>
    )
}