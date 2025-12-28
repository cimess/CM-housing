import React from "react";
import { useTable, useDelete, useUpdate } from "@refinedev/core";
import { Trash2, User, Shield, Ban, Lock, Unlock, Mail, Phone, Calendar, Search, Edit } from "lucide-react";

export const UserList = () => {
  const { tableQueryResult, setFilters, current, setCurrent, pageCount, pageSize, setPageSize } = useTable({
    resource: "users",
    syncWithLocation: false,
  });

  const users = tableQueryResult?.data?.data || [];
  const { mutate: deleteUser } = useDelete();
  const { mutate: updateUser } = useUpdate();

  const handleStatusUpdate = (id, field, currentValue) => {
    updateUser({
        resource: "users",
        id,
        values: { [field]: !currentValue },
        successNotification: {
            message: `User ${!currentValue ? (field === 'isBanned' ? 'Banned' : 'Restricted') : (field === 'isBanned' ? 'Unbanned' : 'Unrestricted')}`,
            type: "success",
        }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">Manage registered users and their roles.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    onChange={(e) => {
                        setFilters([
                            {
                                field: "search",
                                operator: "contains",
                                value: e.target.value,
                            },
                        ]);
                    }}
                />
            </div>
            <select
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-sm font-medium"
                onChange={(e) => {
                    setFilters([
                        {
                            field: "role",
                            operator: "eq",
                            value: e.target.value,
                        },
                    ]);
                }}
            >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="landlord">Landlord</option>
            </select>
        </div>
      </div>

      <div className="glass-panel-light rounded-3xl border border-white/40 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-primary/5 border-b border-white/40 text-xs uppercase font-bold text-primary tracking-wider">
              <tr>
                <th className="px-8 py-5">User</th>
                <th className="px-8 py-5">Contact</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-white/40 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg border border-white/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                       <span >{user.firstname?.[0] || user.email?.[0] || "?"}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-500 text-base mb-0.5">{user.firstname} {user.lastname}</div>
                        <div className="text-xs font-medium text-gray-500 bg-white/50 px-2 py-0.5 rounded-md">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <Mail size={14} className="text-primary/70" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone size={14} className="text-primary/70" />
                            <span>{user.phone || "N/A"}</span>
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-blue-100 text-blue-700 border border-blue-200"
                    }`}>
                      {user.roles?.[0] || user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex gap-2">
                        {user.isBanned && (
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1">
                                <Ban size={12} /> Banned
                            </span>
                        )}
                        {user.isRestricted && (
                            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold flex items-center gap-1">
                                <Lock size={12} /> Restricted
                            </span>
                        )}
                        {!user.isBanned && !user.isRestricted && (
                            <span className="flex items-center gap-2 text-green-700 font-bold text-xs bg-green-50 border border-green-200 px-3 py-1 rounded-full w-fit">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                              Active
                            </span>
                        )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleStatusUpdate(user._id, 'isRestricted', user.isRestricted)}
                        className={`p-2.5 rounded-xl transition-all border ${
                            user.isRestricted
                            ? 'bg-orange-50 text-orange-600 border-orange-200'
                            : 'hover:bg-orange-50 text-gray-400 hover:text-orange-600 border-transparent hover:border-orange-100'
                        }`}
                        title={user.isRestricted ? "Unrestrict" : "Restrict"}
                      >
                        {user.isRestricted ? <Unlock size={18} /> : <Lock size={18} />}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(user._id, 'isBanned', user.isBanned)}
                        className={`p-2.5 rounded-xl transition-all border ${
                            user.isBanned
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : 'hover:bg-red-50 text-gray-400 hover:text-red-600 border-transparent hover:border-red-100'
                        }`}
                        title={user.isBanned ? "Unban" : "Ban"}
                      >
                        <Ban size={18} />
                      </button>
                      <button
                        onClick={() => {
                            if(window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
                                deleteUser({ resource: "users", id: user._id });
                            }
                        }}
                        className="p-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors border border-transparent hover:border-red-100"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!users.length && (
            <div className="p-20 text-center text-muted-foreground">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User size={40} className="opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No users found</h3>
                <p>Try adjusting your search.</p>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {tableQueryResult.isFetching && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 relative">
                         <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                         <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    </div>
                    <span className="text-xs font-bold text-primary">Loading...</span>
                </div>
            </div>
        )}

        {/* Pagination */}
        {users.length > 0 && (
            <div className="px-6 py-4 border-t border-white/40 bg-white/30 backdrop-blur-sm flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Page <span className="font-bold text-foreground">{current}</span> of <span className="font-bold text-foreground">{pageCount || 1}</span> (Total: {tableQueryResult?.data?.total || 0})
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrent(prev => Math.max(prev - 1, 1))}
                        disabled={current === 1}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrent(prev => Math.min(prev + 1, pageCount))}
                        disabled={current === pageCount}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
