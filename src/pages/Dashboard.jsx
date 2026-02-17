import { useAppContext } from "../context/AppProvider";

//Icons
import { FiUsers } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { MdAdminPanelSettings,MdOutlinePendingActions } from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
import { HiStatusOnline } from "react-icons/hi";
import { AiOutlineFileDone } from "react-icons/ai";


export default function Dashboard(){

    const { users, requests, currentRole, currentUserId } = useAppContext();
    
    //Admin summary card  logic
    const activeUsersCount = users.filter((user) => user.status === "Active").length;
    const adminCount = users.filter((user) => user.role === "admin").length;
    const pendingReqCount = requests.filter((req) => req.status === "pending").length;
    
    //Member summary card logic
    const currentUser = users.find(u => u.id === currentUserId);
    const totalRequests = requests.filter((u) =>u.userId === currentUserId);
    const pendingRequests = totalRequests.filter(u => u.status === "pending").length;

    
    return(
        <div className="min-h-full">
           
            {currentRole === "admin" 
            ? 
                <>
                    {/* Admin Dashboard View */}
                    <HeaderSection 
                        heading = "System Overview"
                        des = "Monitor real-time system performance and user activity."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Card 
                            icon={FiUsers}
                            label="Total Users"
                            des={users.length}
                        />
                        <Card 
                            icon={FaUserCheck}
                            label="Total Active Users"
                            des={activeUsersCount}
                        />
                        <Card 
                            icon={MdAdminPanelSettings}
                            label="Admin Count"
                            des={adminCount}
                        />
                        <Card 
                            icon={MdOutlinePendingActions}
                            label="Pending Request"
                            des={pendingReqCount}
                        />
                    </div>
                </>
            : 
                <>
                    {/* Member Dashboard View */}
                    <HeaderSection
                        heading="Your Stats Overview"
                        des="View your role, account status, and track your submitted access or role change requests."
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Card 
                            icon={BsPersonCheck}
                            label="Role"
                            des={currentUser?.role}
                        />
                        <Card 
                            icon={HiStatusOnline}
                            label="Current Status"
                            des={currentUser?.status}
                        />
                        <Card 
                            icon={MdOutlinePendingActions}
                            label="Pending requests"
                            des={pendingRequests}
                        />
                        <Card 
                            icon={AiOutlineFileDone}
                            label="Total Requests"
                            des={totalRequests?.length}
                        />
                    </div>
                </>
            }
        </div>
    )
}

function Card({ icon: Icon, label, des }) {
  return (
    <div className="group relative bg-slate-900 border border-white/10 rounded-xl p-6 transition-all duration-200 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">

      {/* Icon Wrapper */}
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition">
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-400 tracking-wide">
          {label}
        </p>

        <h3 className="mt-1 text-3xl font-semibold text-white tracking-tight">
          {des}
        </h3>
      </div>
    </div>
  );
}


function HeaderSection({heading, des}){
    return(
        <div className="mb-10">
            <h1 className="text-2xl font-medium text-white">{heading}</h1>
            <p className="text-slate-400 mt-2">{des}</p>
        </div>
    )
}