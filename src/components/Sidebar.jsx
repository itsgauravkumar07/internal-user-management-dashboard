import { NavLink } from "react-router-dom"

export default function Sidebar(){

    return(
        <section className="flex flex-col min-h-screen bg-blue-300 w-fit px-5 py-5 gap-2">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/dashboard/users">Users</NavLink>
            <NavLink to="/dashboard/requests">Requests</NavLink>
        </section>
    )
}