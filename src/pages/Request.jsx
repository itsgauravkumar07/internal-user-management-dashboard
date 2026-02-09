import { useAppContext } from '../context/AppProvider';

export default function Request(){

    const { requests, setRequests, currentRole, users } = useAppContext();

    return(
        <div>
            {
                currentRole === "admin" 
                ? 
                    <>
                        <table>
                            <thead>
                                <tr className='border'>
                                    <th className="border px-5">User</th>
                                    <th className="border px-5">type</th>
                                    <th className="border px-5">Value</th>
                                    <th className="border px-5">Status</th>
                                    <th className="border px-5">Time</th>
                                    <th className="border px-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {requests.map(req => {
                                    const user = users.find(u => u.id === req.userId);
                                    return(
                                         <tr key={req.id}>
                                        <td className="border px-5">
                                            {user ? user.name : "unknown user"}
                                        </td>
                                        <td className="border px-5">{req.type}</td>
                                        <td className="border px-5">{req.requestedValue}</td>
                                        <td className="border px-5">{req.status}</td>
                                        <td className="border px-5">{req.createdAt}</td>
                                        <td className="border px-5">
                                            <select>
                                                <option value="pending">Pending</option>
                                                <option value="approve">Approve</option>
                                                <option value="reject">Reject</option>
                                            </select>
                                        </td>
                                    </tr>
                                    )})}
                            </tbody>
                        </table>
                    </>
                : 
                    <>
                        <table>
                            <thead>
                                <tr className='border'>
                                    <th className="border px-5">User</th>
                                    <th className="border px-5">type</th>
                                    <th className="border px-5">Value</th>
                                    <th className="border px-5">Status</th>
                                    <th className="border px-5">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => {
                                    const user = users.find(u => u.id === req.userId);
                                    return(
                                         <tr key={req.id}>
                                        <td className="border px-5">
                                            {user ? user.name : "unknown user"}
                                        </td>
                                        <td className="border px-5">{req.type}</td>
                                        <td className="border px-5">{req.requestedValue}</td>
                                        <td className="border px-5">{req.status}</td>
                                        <td className="border px-5">{req.createdAt}</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </>
            }
        </div>
    )
}