import { NavLink } from "react-router-dom"
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { LuGitPullRequestArrow } from "react-icons/lu";

export default function Sidebar(){

    return(
        <section className="flex flex-col min-h-screen bg-slate-800 w-70 py-5 gap-1 pl-4 pr-3">
           
           <SidebarItem 
                to="/dashboard" 
                icon={BsFillMenuButtonWideFill} 
                label="Dashboard" 
                end
            />
           
           <SidebarItem 
                to="/dashboard/users" 
                icon={FiUsers} 
                label="Users" 
            />

            <SidebarItem 
                to="/dashboard/requests" 
                icon={LuGitPullRequestArrow} 
                label="Requests" 
            />
            
        </section>
    )
}


function SidebarItem({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-4 py-3 rounded-lg transition
        ${isActive 
          ? "bg-blue-500/10 text-blue-600" 
          : "hover:bg-gray-50/3 text-slate-400"}
        `
      }
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  );
}