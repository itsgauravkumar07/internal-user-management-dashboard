import { useAppContext } from '../context/AppProvider';

export default function Request(){

    const { request, setRequest, currentRole } = useAppContext();

    return(
        <div>
            {
                currentRole === "admin" 
                ? 
                <>
                    <p>You are in admin page</p>
                </>
                : 
                <>
                    <p>You are in member page</p>
                </>
            }
        </div>
    )
}