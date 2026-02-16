import { useAppContext } from '../context/AppProvider';

export default function Navbar(){

    const { currentRole } = useAppContext();

    return (
        <nav className='flex justify-between bg-gray-900 items-center py-3 px-5 border-b border-white/10'>
            <h1 className='font-bold text-2xl text-white'>Internal Dashboard</h1>
            <p className='text-sm px-4 py-2 bg-blue-800/60 text-white font-medium rounded-lg border border-blue-600/40'>{ currentRole }</p>
        </nav>
    )
}