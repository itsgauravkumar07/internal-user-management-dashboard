import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AppLayout(){

    return(
        <section className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </section>
    )
}