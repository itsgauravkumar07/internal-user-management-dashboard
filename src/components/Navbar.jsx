import { useAppContext } from '../context/AppProvider';

export default function Navbar(){

    const { currentRole } = useAppContext();

    return (
        <nav className='flex justify-between bg-gray-300 items-center py-5 px-5'>
            <h1 className='font-bold text-2xl'>Internal Dashboard</h1>
            <p className='text-sm px-2 py-1 bg-green-500 text-white rounded pr-5'>{ currentRole }</p>
        </nav>
    )
}