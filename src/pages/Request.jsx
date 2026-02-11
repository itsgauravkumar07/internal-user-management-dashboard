import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';

export default function Request(){

    const { requests, setRequests, currentRole, users, currentUserId, setUsers } = useAppContext();
    const [reqType, setReqType] = useState('');
    const [roleChange, setRoleChange] = useState('');
    const [accessReq, setAccessReq] = useState('');

    //Member submit
    function handleSubmit(e){

        e.preventDefault();

        const requestedValue = reqType === "role_change" ? roleChange : accessReq;
        
        const reqObj = {
            id: crypto.randomUUID(),
            userId: currentUserId,
            type: reqType,
            requestedValue,
            createdAt: Date.now(),
            status: "pending",
        }
        setRequests([...requests, reqObj]);
        setRoleChange("");
        setAccessReq("");
        setReqType("");
    }

    //Admin Approval
    function handleApprove(requestId){

        //find the request that approved
       const request = requests.find(r => r.id === requestId);

       //Update the status of request: pending => Approved
       const updatedReq = requests.map(req =>
        req.id === requestId 
        ? {...req, status: "approved"}
        : req
       )
       setRequests(updatedReq);

       //Update requested data in users
       setUsers(prev => 
        prev.map(user => {
        
            if(user.id !== request.userId) return user;

            if(request.type === "role_change"){
                return {...user, role: request.requestedValue};
            }

            if(request.type === "access_change"){
                return {...user, status: request.requestedValue};
            }

            return user;
        })
       )
    }

    //Amin Reject
    function handleReject(requestId){
        const updatedReq = requests.map(req => 
            req.id === requestId
            ? {...req, status: "reject"}
            : req
        )
        setRequests(updatedReq);
    }

    //Filter requests according to the member
    const myRequests = requests.filter(
        (req) => req.userId === currentUserId
    );


    return(
        <div>
            {
                currentRole === "admin" 
                    ? 
                    // Admin view 
                        <>
                            <table>
                                <thead>
                                    <tr className='border'>
                                        <th className="border px-5">User</th>
                                        <th className="border px-5">type</th>
                                        <th className="border px-5">Value</th>
                                        <th className="border px-5">Time</th>
                                        <th className="border px-5">Status</th>
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
                                            <td className="border px-5">{new Date(req.createdAt).toLocaleDateString()}</td>
                                            <td className="border px-5">{req.status}</td>
                                            {req.status === "pending" && 
                                            <td className='border px-5 flex'>
                                                <button onClick={() => handleApprove(req.id, req.userId)} className='bg-green-500 px-3 py-1 rounded my-2 mx-2 font-medium hover:bg-green-600'>Approve</button>
                                                <button onClick={() => handleReject(req.id)} className='bg-red-500 px-3 py-1 rounded my-2 mx-2 font-medium text-white hover:bg-red-600'>Reject</button>
                                            </td>
                                            }
                                            
                                        </tr>
                                        )})}
                                </tbody>
                            </table>
                        </>
                    : 
                    //Member view
                        <>
                            <div className='bg-slate-100 py-5 px-5 border border-slate-300 rounded mb-10 w-80'>
                                <h1 className='text-2xl font-medium'>Request form</h1>
                                    <form 
                                    onSubmit={handleSubmit} 
                                    className='flex flex-col gap-2 mt-5'>
                                    <label className='font-medium text-gray-700'>Request Type</label>
                                    <select 
                                        className=' border border-gray-300 w-full text-sm font-medium text-gray-800 px-2 py-1 rounded'
                                        value={reqType}
                                        onChange={e => setReqType(e.target.value)}>
                                        <option value="">Select option</option>
                                        <option value="role_change">Role change</option>
                                        <option value="access_request">Access Request</option>
                                    </select>

                                    {reqType === "role_change" 
                                    ? 
                                        <>
                                            <label className='mt-2 font-medium text-gray-700'>Role change</label>
                                            <select 
                                                className=' border border-gray-300 w-full text-sm font-medium text-gray-800 px-2 py-1 rounded'
                                                value={roleChange}
                                                onChange={e => setRoleChange(e.target.value)}>
                                                <option value="">Select option</option>
                                                <option value="admin">Admin</option>
                                                <option value="member">Member</option>
                                            </select>
                                            <button className='bg-blue-500 text-white py-1 rounded mt-3 font-medium hover:bg-blue-600'>Submit</button>
                                        </>
                                    : 
                                        <>
                                            <label className='mt-2 font-medium text-gray-700'>Access request</label>
                                            <select 
                                                className=' border border-gray-300 w-full text-sm font-medium text-gray-800 px-2 py-1 rounded'
                                                value={accessReq}
                                                onChange={e => setAccessReq(e.target.value)}>
                                                <option value="">Select option</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                            <button className='bg-blue-500 text-white py-1 rounded mt-3 font-medium hover:bg-blue-600'>Submit</button>
                                        </>
                                    }
                                </form>
                            </div>

                            
                            {myRequests.length === 0 ? 
                            <p>No request found</p>
                            : 
                            <table>
                                <thead>
                                    <tr className='border'>
                                        <th className="border px-5">User</th>
                                        <th className="border px-5">type</th>
                                        <th className="border px-5">Value</th>
                                        <th className="border px-5">Time</th>
                                        <th className="border px-5">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {myRequests.map(req => {
                                        
                                        const user = users.find(u => u.id === req.userId);

                                        return(
                                            <tr key={req.id}>
                                            <td className="border px-5">
                                                {user ? user.name : "unknown user"}
                                            </td>
                                            <td className="border px-5">{req.type}</td>
                                            <td className="border px-5">{req.requestedValue}</td>
                                            <td className="border px-5">{req.createdAt}</td>
                                            <td className="border px-5">{req.status}</td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                            }
                            
                        </>
            }
        </div>
    )
}