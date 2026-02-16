
import { useAppContext } from "../context/AppProvider";
import { FiUsers } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
import { HiStatusOnline } from "react-icons/hi";
import { AiOutlineFileDone } from "react-icons/ai";


export default function Dashboard(){

    const { users, requests, currentRole, currentUserId } = useAppContext();
    
    const activeUsersCount = users.filter((user) => user.status === "Active").length;
    const adminCount = users.filter((user) => user.role === "admin").length;
    const pendingReqCount = requests.filter((req) => req.status === "pending").length;
    
    const currentUser = users.find(u => u.id === currentUserId);
    const totalRequests = requests.filter((u) =>u.userId === currentUserId);
    const pendingRequests = totalRequests.filter(u => u.status === "pending").length;

    
    return(
        <div className="min-h-full">
           
            {currentRole === "admin" 
            ? 
                <>
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
    <div
      className="bg-slate-300/5 border border-slate-600/30 rounded-lg px-5 py-5 hover:bg-slate-300/10">
      <Icon className="h-9 w-9 bg-blue-500/10 px-1 py-2 rounded-lg text-blue-500" />
      <div className="font-medium mt-3 text-slate-400 text-sm">{label}</div>
      <div className="font-bold text-white text-2xl">{des}</div>
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
