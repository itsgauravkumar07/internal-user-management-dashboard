import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';
import { MdMenu } from "react-icons/md";
import { NavLink } from 'react-router-dom';

export default function Navbar(){

    const { currentRole } = useAppContext();
    const [menu, setMenu] = useState(false);

    return (
        <nav className='flex justify-between bg-gray-900 items-center py-3 px-5 border-b border-white/10'>
            <h1 className='font-bold text-md md:text-2xl text-white'>Internal Dashboard</h1>
            <div className='relative'>
                <div className='flex gap-3 items-center'>
                    <p className='text-xs px-2 py-1 md:text-sm md:px-4 md:py-2 bg-blue-800/60 text-white font-medium rounded-lg border border-blue-600/40'>{ currentRole }</p>
                    <p onClick={() => setMenu(!menu)}><MdMenu className='text-white w-6 h-6 md:hidden block'/></p>
                    {menu && 
                        <div className='bg-gray-900 border border-white/30 px-3 py-3 absolute top-8 rounded'>
                            <div className='flex flex-col gap-2'>
                                <NavbarItem 
                                to="/dashboard"
                                label="Dashboard"
                                end
                                />
                                <NavbarItem 
                                to="/dashboard/users"
                                label="Users"
                                />
                                <NavbarItem 
                                to="/dashboard/requests"
                                label="Requests"
                                />
                                
                            </div>
                        </div>
                    }
                </div>
            </div>
            
            
        </nav>
    )
}

function NavbarItem({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        flex items-center gap-1 px-2 py-1 rounded-lg transition
        ${isActive 
          ? "bg-blue-500/10 text-blue-600" 
          : "hover:bg-gray-50/3 text-slate-400"}
        `
      }
    >
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  );
}