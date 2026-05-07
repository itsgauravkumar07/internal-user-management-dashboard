import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';

export default function Request(){

    const { requests, addRequest, updateRequest, getAuthUser, users } = useAppContext();
    const [reqType, setReqType] = useState('');
    const [roleChange, setRoleChange] = useState('');
    const [accessReq, setAccessReq] = useState('');
    const [errors, setErrors] = useState({});

    const authUser = getAuthUser();

    const currentAppUser = users.find(
      (u) => String(u._id) === String(authUser?.appUserId)
    );

    //Member submit
    async function handleSubmit(e){
      e.preventDefault();
      console.log("This current user: ", currentAppUser);

      let error = {};

      if(!reqType) error.reqType = "Select request type";
      if(reqType === "role_change" && !roleChange) error.roleChange = "Select Role";
      if(reqType === "access_request" && !accessReq) error.accessReq = "Select Access";

      if(Object.keys(error).length > 0){
        setErrors(error);
        return;
      }

      const requestedValue =
        reqType === "role_change" ? roleChange : accessReq;

      if(!currentAppUser){
        alert("User not found");
        return;
      }

      try {
        await addRequest({
          userId: currentAppUser._id,
          type: reqType,
          requestedValue
        });

        setRoleChange("");
        setAccessReq("");
        setReqType("");
        setErrors({});
      } catch (err) {
        alert(err.message);
      }
  }

    //Admin Approval
   async function handleApprove(requestId){
    await updateRequest(requestId, "approved");
  }

    //Amin Reject
    async function handleReject(requestId){
      try {
        await updateRequest(requestId, "rejected");
      } catch (err) {
        alert(err.message);
      }
    }

    //Filter requests according to the member
    const myRequests = currentAppUser
      ? requests.filter(
        (req) => String(req.userId ) === String(currentAppUser._id)
    )
    : [];


   return (
  <div className="md:p-6 text-slate-300 space-y-6 md:space-y-10">

    {/* ADMIN VIEW  */}
    {authUser?.role === "admin" && (
      <div className="bg-slate-900 rounded-xl border border-white/10 shadow-md overflow-hidden">

        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold">Access Requests</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage role and access change requests
          </p>
        </div>

        
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-4 text-left">User</th>
                <th className="px-4 py-4 text-left">Type</th>
                <th className="px-4 py-4 text-left">Value</th>
                <th className="px-4 py-4 text-left">Time</th>
                <th className="px-4 py-4 text-right">Status</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {requests.map(req => {

                return (
                  <tr key={req._id} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-4">
                      {req.userName || "Unknown"}
                    </td>

                    <td className="px-4 py-4 capitalize">
                      {req.type.replace("_", " ")}
                    </td>

                    <td className="px-4 py-4">
                      {req.requestedValue}
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4 text-right">
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
                              handleApprove(req._id)
                            }
                            className="px-2 py-1 text-xs font-medium rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(req._id)}
                            className="px-2 py-1 text-xs font-medium rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30"
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

              {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4 p-4">
          {requests.map(req => {

            return (
              <div
                key={req._id}
                className="bg-slate-800/40 border border-white/10 rounded-xl p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium">
                    {req.userName || "Unknown"}
                  </h3>

                  <StatusBadge status={req.status} />
                </div>

                <div className="text-sm text-slate-400">
                  Type: <span className="text-slate-300 capitalize">
                    {req.type.replace("_", " ")}
                  </span>
                </div>

                <div className="text-sm text-slate-400">
                  Value: <span className="text-slate-300">
                    {req.requestedValue}
                  </span>
                </div>

                <div className="text-sm text-slate-400">
                  Date: <span className="text-slate-300">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {req.status === "pending" && (
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() =>
                              handleApprove(req._id)
                            }
                            className="px-3 py-1 text-xs font-medium rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(req._id)}
                            className="px-3 py-1 text-xs font-medium rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          >
                            Reject
                          </button>
                        </div>
                      )}
              </div>
            );
          })}
        </div>
      </div>
    )}

    {/* MEMBER VIEW */}
    {authUser?.role !== "admin" && (
  <div className="space-y-8">

    {/* Request Form */}
    <div className="bg-slate-900 rounded-xl border border-white/10 
                    p-4 sm:p-6 
                    w-full sm:max-w-md 
                    shadow-md">
      <h2 className="text-base sm:text-lg font-semibold">
        Create Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-5"
      >
        {/* Request Type */}
        <div>
          <label className="text-xs sm:text-sm text-slate-400">
            Request Type
          </label>
          <select
            className="w-full mt-1 bg-slate-800 border border-white/10 
                       rounded-md px-3 py-2 text-sm"
            value={reqType}
            onChange={e => setReqType(e.target.value)}
          >
            <option value="">Select option</option>
            <option value="role_change">Role change</option>
            <option value="access_request">Access Request</option>
          </select>
          <p className="text-red-500 text-xs mt-1">
            {errors.reqType}
          </p>
        </div>

        {/* Role Change */}
        {reqType === "role_change" && (
          <div>
            <label className="text-xs sm:text-sm text-slate-400">
              Role
            </label>
            <select
              className="w-full mt-1 bg-slate-800 border border-white/10 
                         rounded-md px-3 py-2 text-sm"
              value={roleChange}
              onChange={e => setRoleChange(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
            <p className="text-red-500 text-xs mt-1">
              {errors.roleChange}
            </p>
          </div>
        )}

        {/* Access Request */}
        {reqType === "access_request" && (
          <div>
            <label className="text-xs sm:text-sm text-slate-400">
              Access Status
            </label>
            <select
              className="w-full mt-1 bg-slate-800 border border-white/10 
                         rounded-md px-3 py-2 text-sm"
              value={accessReq}
              onChange={e => setAccessReq(e.target.value)}
            >
              <option value="">Select option</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <p className="text-red-500 text-xs mt-1">
              {errors.accessReq}
            </p>
          </div>
        )}

        <button className="mt-2 bg-blue-600 hover:bg-blue-700 transition rounded-md py-2 text-sm font-medium">
          Submit Request
        </button>
      </form>
    </div>

    {/* My Requests */}

    <div className="bg-slate-900 rounded-xl border border-white/10 shadow-md overflow-hidden">

      <div className="p-4 sm:p-6 border-b border-white/10">
        <h2 className="text-base sm:text-lg font-semibold">
          My Requests
        </h2>
      </div>

      {myRequests.length === 0 ? (
        <div className="p-4 sm:p-6 text-sm text-slate-400">
          No requests found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Value</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {myRequests.map(req => (
                  <tr key={req._id}>
                    <td className="px-4 py-3 capitalize">
                      {req.type.replace("_", " ")}
                    </td>
                    <td className="px-4 py-3">
                      {req.requestedValue}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {req.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="block md:hidden p-4 space-y-4">
            {myRequests.map(req => (
              <div
                key={req._id}
                className="bg-slate-800 rounded-lg p-4 space-y-2"
              >
                <div className="text-sm capitalize">
                  <span className="text-slate-400">Type:</span>{" "}
                  {req.type.replace("_", " ")}
                </div>

                <div className="text-sm">
                  <span className="text-slate-400">Value:</span>{" "}
                  {req.requestedValue}
                </div>

                <div className="text-sm text-slate-400">
                  {new Date(req.createdAt).toLocaleDateString()}
                </div>

                <div className="text-sm font-medium">
                  {req.status}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>

  </div>
)}
  </div>
);
}

function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-md font-medium ${
        status === "pending"
          ? "bg-yellow-500/20 text-yellow-400"
          : status === "approved"
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {status}
    </span>
  );
}