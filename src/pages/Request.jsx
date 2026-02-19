import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';

export default function Request(){

    const { requests, setRequests, currentRole, users, currentUserId, setUsers } = useAppContext();
    const [reqType, setReqType] = useState('');
    const [roleChange, setRoleChange] = useState('');
    const [accessReq, setAccessReq] = useState('');
    const [errors, setErrors] = useState({});

    //Member submit
    function handleSubmit(e){

      e.preventDefault();

      let error = {};

      if(!reqType){
        error.reqType = "Select request type";
      }
      if(reqType === "role_change" && !roleChange){
        error.roleChange = "Select Role";
      }

      if(reqType === "access_request" && !accessReq){
        error.accessReq = "Select Access status"
      }

      if(Object.keys(error).length > 0){
        setErrors(error);
        return;
      }

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
        setErrors({});
    }

    //Admin Approval
    function handleApprove(requestId){

        //find the request that approved
       const request = requests.find(r => r.id === requestId);
       if(!request) return;
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

            if(request.type === "access_request"){
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


   return (
  <div className="p-6 text-slate-300 space-y-10">

    {/* ADMIN VIEW  */}
    {currentRole === "admin" && (
      <div className="bg-slate-900 rounded-xl border border-white/10 shadow-md overflow-hidden">

        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold">Access Requests</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage role and access change requests
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Value</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-right">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {requests.map(req => {
                const user = users.find(u => u.id === req.userId);

                return (
                  <tr key={req.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      {user ? user.name : "Unknown"}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {req.type.replace("_", " ")}
                    </td>

                    <td className="px-6 py-4">
                      {req.requestedValue}
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span
                        className={`px-2 py-1 text-xs rounded-md font-medium ${
                          req.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : req.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      {req.status === "pending" && (
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() =>
                              handleApprove(req.id, req.userId)
                            }
                            className="px-3 py-1 text-xs font-medium rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(req.id)}
                            className="px-3 py-1 text-xs font-medium rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* MEMBER VIEW */}
    {currentRole !== "admin" && (
      <>
        {/* Request Form */}
        <div className="bg-slate-900 rounded-xl border border-white/10 p-6 w-full max-w-md shadow-md">
          <h2 className="text-lg font-semibold">Create Request</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-6"
          >
            <div>
              <label className="text-sm text-slate-400">
                Request Type
              </label>
              <select
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                value={reqType}
                onChange={e => setReqType(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="role_change">Role change</option>
                <option value="access_request">Access Request</option>
              </select>
              <p className="text-red-500 text-xs mt-1">{errors.reqType}</p>
              
            </div>

            {reqType === "role_change" && (
              <div>
                <label className="text-sm text-slate-400">
                  Role
                </label>
                <select
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-md px-3 py-2 text-sm"
                  value={roleChange}
                  onChange={e => setRoleChange(e.target.value)}
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
                <p className="text-red-500 text-xs mt-1">{errors.roleChange}</p>
              </div>
            )}

            {reqType === "access_request" && (
              <div>
                <label className="text-sm text-slate-400">
                  Access Status
                </label>
                <select
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-md px-3 py-2 text-sm"
                  value={accessReq}
                  onChange={e => setAccessReq(e.target.value)}
                >
                  <option value="">Select option</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <p className="text-red-500 text-xs mt-1">{errors.accessReq}</p>
              </div>
            )}

            <button className="mt-2 bg-blue-600 hover:bg-blue-700 transition rounded-md py-2 text-sm font-medium">
              Submit Request
            </button>
          </form>
        </div>

        {/* My Requests Table */}
        <div className="bg-slate-900 rounded-xl border border-white/10 shadow-md overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold">
              My Requests
            </h2>
          </div>

          {myRequests.length === 0 ? (
            <div className="p-6 text-sm text-slate-400">
              No requests found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-left">Value</th>
                    <th className="px-6 py-4 text-left">Time</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {myRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-800/40">
                      <td className="px-6 py-4 capitalize">
                        {req.type.replace("_", " ")}
                      </td>
                      <td className="px-6 py-4">
                        {req.requestedValue}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`px-2 py-1 text-xs rounded-md font-medium ${
                            req.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : req.status === "approved"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    )}
  </div>
);
}