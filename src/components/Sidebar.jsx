import { NavLink } from "react-router-dom"

export default function Sidebar(){

    return(
        <section className="flex flex-col min-h-screen bg-gray-300 w-fit px-5 py-2 gap-2">
            <NavLink to="/dashbaord">Dashboard</NavLink>
            <NavLink to="/dashbaord/users">Users</NavLink>
            <NavLink to="/dashbaord/requests">Requests</NavLink>
        </section>
    )
}