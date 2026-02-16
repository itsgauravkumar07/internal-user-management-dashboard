import { useState } from "react";
import { useAppContext } from "../context/AppProvider";
import Modal from "../components/Modal";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

export default function Users(){

    const { users, currentRole, setUsers } = useAppContext();
    const [isModal, setIsModal] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [mode, setMode] = useState("add");

    const [editingIdUserId, seteditingUserId] = useState(null);

    function addOpenModel(){
        setIsModal(!isModal);
        setMode("add");
    }

    function editOpenModel(id){
        const user = users.find(u => u.id === id);
        seteditingUserId(id);
        setName(user.name);
        setRole(user.role);
        setStatus(user.status);

        setIsModal(!isModal);
        setMode("edit");
    }

    function closeModel(){
        setIsModal(!isModal);
        setName("");
        setRole("");
        setStatus("");
        setErrors({});
    }

    function handleEdit(e){
        e.preventDefault();

        let error = {};

        if(!name.trim()){
            error.name = "Name required";
        }

        if(!role.trim()){
            error.role = "Role Required";
        }

        if(!status.trim()){
            error.status = "Status required";
        }
        

        if(Object.keys(error).length > 0){
            setErrors(error);
            return;
        }
        
        const updatedUser = users.map(user => 
            user.id === editingIdUserId 
            ? {...user, name, role, status} 
            : user
        );

        setUsers(updatedUser);
        closeModel();
    }
    
    function handleAdd(e){

        e.preventDefault();

        let error = {};

        if(!name.trim()){
            error.name = "Name required";
        }

        if(!role.trim()){
            error.role = "Role Required";
        }

        if(!status.trim()){
            error.status = "Status required";
        }
        

        if(Object.keys(error).length > 0){
            setErrors(error);
            return;
        }
        
        const newValue = {
                id: Date.now().toString(36),
                name: name,
                role: role,
                status: status
            };

        setUsers([...users, newValue]);
        closeModel();
        setName("");
        setRole("");
        setStatus("");
        setErrors({});
    }

    function handleDelete(id){
        const updatedUser = users.filter(user => user.id !== id);
        setUsers(updatedUser);
    }

   return (
  <section className="p-6 text-slate-300 space-y-8">

    {/* USERS SECTION  */}
    <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md overflow-hidden">

      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <HeaderSection
          heading="Users"
          des={
            currentRole === "admin"
              ? "Manage system access, roles, and account status."
              : "Read-only access to users and roles."
          }
        />

        {currentRole === "admin" && (
          <button
            onClick={addOpenModel}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm font-medium"
          >
            <IoMdPersonAdd className="w-4 h-4" />
            Add User
          </button>
        )}
      </div>

      {users.length === 0 ? (
        <div className="p-6 text-sm text-slate-400">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-right">Status</th>
                {currentRole === "admin" && (
                  <th className="px-6 py-4 text-right">Action</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.role}</td>

                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-medium ${
                        user.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {currentRole === "admin" && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => editOpenModel(user.id)}
                          className="p-2 rounded-md hover:bg-blue-500/20 text-blue-400 transition"
                        >
                          <MdOutlineEdit className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 rounded-md hover:bg-red-500/20 text-red-400 transition"
                        >
                          <MdDeleteOutline className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* MODAL */}
    {isModal && (
      <Modal isModal={isModal} onClose={closeModel}>
        <div className="bg-slate-900 text-slate-300 p-8 rounded-xl">

          <h2 className="text-lg font-semibold mb-6">
            {mode === "add" ? "Add User" : "Edit User"}
          </h2>

          <form
            onSubmit={mode === "add" ? handleAdd : handleEdit}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="text-sm text-slate-400">Name</label>
              <input
                type="text"
                placeholder="Ravi Kumar"
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            </div>

            {/* Role & Status */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-slate-400">Role</label>
                <select
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-md px-3 py-2 text-sm"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </select>
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              </div>

              <div className="flex-1">
                <label className="text-sm text-slate-400">Status</label>
                <select
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-md px-3 py-2 text-sm"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <p className="text-red-500 text-xs mt-1">{errors.status}</p>
              </div>
            </div>

            {/* Submit */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md text-sm font-medium">
              {mode === "add" ? "Add User" : "Update User"}
            </button>
          </form>
        </div>
      </Modal>
    )}
  </section>
);

}

function HeaderSection({heading, des}){
    return(
        <div className="">
            <h1 className="text-2xl font-medium text-white">{heading}</h1>
            <p className="text-slate-400 mt-2">{des}</p>
        </div>
    )
}

