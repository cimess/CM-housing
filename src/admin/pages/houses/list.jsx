import React from "react";
import { useTable, useNavigation, useDelete, useUpdate } from "@refinedev/core";
import { Edit, Trash2, MapPin, Home, CheckCircle, XCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { useNavigate } from "react-router-dom";

export const HouseList = () => {
  const { tableQueryResult, setFilters, current, setCurrent, pageCount, pageSize, setPageSize } = useTable({
    resource: "houses",
    syncWithLocation: false,
  });

  const houses = tableQueryResult?.data?.data || [];

  const { edit } = useNavigation();
  const { mutate: deleteHouse } = useDelete();
  const { mutate: updateHouse } = useUpdate();

  const toggleAvailability = (id, currentStatus) => {
    updateHouse({
        resource: "houses",
        id,
        values: { isAvailable: !currentStatus },
        successNotification: {
            message: `House marked as ${!currentStatus ? "Available" : "Taken"}`,
            type: "success",
        },
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

    const {isAdminLogin} = useLoginAuth();

    const navigate = useNavigate();

    if(!isAdminLogin){
      console.log("unauthorized");
      navigate('/cimessadmin/login');
      return
    }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-500">Manage your house listings.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto items-center">
            <input
                type="text"
                placeholder="Search houses..."
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
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
            <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                    setFilters([
                        {
                            field: "filter",
                            operator: "eq",
                            value: e.target.value,
                        },
                    ]);
                }}
            >
                <option value="">All Types</option>
                <option value="shortLet">Short Let</option>
                <option value="fullLet">Long Let</option>
                <option value="available">Available</option>
                <option value="taken">Taken</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
            + Add New
            </button>
        </div>
      </div>

      <div className="glass-panel-light rounded-3xl border border-white/40 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-primary/5 border-b border-white/40 text-xs uppercase font-bold text-primary tracking-wider">
              <tr>
                <th className="px-8 py-5">Property</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {houses.map((house) => (
                <tr key={house._id} className="hover:bg-white/40 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-white/50 shadow-sm">
                        {house.images?.[0] ? (
                          <img src={house.images[0]} alt="" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Home size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-base mb-1">{house.houseType}</div>
                        <div className="text-xs font-medium text-muted-foreground bg-white/50 px-2 py-1 rounded-md inline-block">{house.bedrooms} Bed • {house.bathrooms} Bath</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <MapPin size={16} className="text-primary" />
                      <span>{house.location?.state}, {house.location?.town}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2 items-start">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        house.durationType === "short"
                            ? "bg-purple-100 text-purple-700 border border-purple-200"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}>
                        {house.durationType === "short" ? "Short" : "Long"}
                        </span>
                        <button
                            onClick={() => toggleAvailability(house._id, house.isAvailable)}
                            className={`flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-105 ${
                                house.isAvailable !== false ? "text-green-600 bg-green-50 px-2 py-1 rounded-md" : "text-red-600 bg-red-50 px-2 py-1 rounded-md"
                            }`}
                            title="Click to toggle status"
                        >
                            {house.isAvailable !== false ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            {house.isAvailable !== false ? "Available" : "Taken"}
                        </button>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-500 text-lg">
                    {formatPrice(house.durationType === "short" ? house.pricePerNight : house.rentPrice)}
                    <span className="text-gray-500 font-normal text-xs block mt-1">
                        /{house.durationType === "short" ? "night" : "year"}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => edit("houses", house._id)}
                        className="p-2.5 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors border border-transparent hover:border-blue-100"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                            if(window.confirm("Are you sure you want to delete this listing?")) {
                                deleteHouse({ resource: "houses", id: house._id });
                            }
                        }}
                        className="p-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors border border-transparent hover:border-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!houses.length && (
            <div className="p-20 text-center text-muted-foreground">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home size={40} className="opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No properties found</h3>
                <p>Try adjusting your filters or add a new property.</p>
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
        {houses.length > 0 && (
            <div className="px-6 py-4 border-t border-white/40 bg-white/30 backdrop-blur-sm flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Page <span className="font-bold text-gray-400">{current}</span> of <span className="font-bold text-gray-500">{pageCount || 1}</span> (Total: {tableQueryResult?.data?.total || 0})
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
