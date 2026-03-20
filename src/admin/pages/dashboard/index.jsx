import React, { useMemo } from "react";
import { useList } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { Users, Home, Activity, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

const StatCard = ({ title, value, icon: Icon, color, trend, loading }) => (
  <div className="group relative overflow-hidden bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center flex-col">
    <div className="relative z-10 flex items-start justify-between mb-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg shadow-current/30 text-white transform group-hover:rotate-6 transition-transform duration-300`}>
        <Icon size={26} />
      </div>
    </div>

    <div className="relative z-10">
      <h3 className="text-gray-600 text-sm font-semibold tracking-wide uppercase mb-1">{title}</h3>
      <p className="text-3xl font-serif font-bold tracking-tight text-gray-400 text-center">
        {loading ? <span className="animate-pulse bg-gray-200 h-9 w-24 block rounded-lg"></span> : value}
      </p>
    </div>
  </div>
);

export const Dashboard = () => {
  // Fetch more data for charts (100 items should cover enough for a demo)
  const { data: houseData, isLoading: housesLoading } = useList({
    resource: "houses",
    pagination: { pageSize: 100 },
  });

  const { data: userData, isLoading: usersLoading } = useList({
    resource: "users",
    pagination: { pageSize: 100 },
  });

  const { data: reportData, isLoading: reportsLoading } = useList({
    resource: "reports",
    pagination: { pageSize: 1 },
    filters: [
        {
            field: "status",
            operator: "eq",
            value: "pending",
        },
    ],
  });

  const totalHouses = houseData?.total || 0;
  const totalUsers = userData?.total || 0;
  const pendingReports = reportData?.total || 0;

  // Process Data for Charts
  const locationData = useMemo(() => {
    if (!houseData?.data) return [];

    const stats = {};
    houseData.data.forEach(house => {
        // Simple extraction of city/area from address (assuming standard format or just taking first word)
        // Adjust logic based on actual address format. Here we take the last part or just use full address if short.
        const location = house.address ? house.address.split(',')[0].trim() : "Unknown";
        stats[location] = (stats[location] || 0) + 1;
    });

    return Object.keys(stats)
        .map(key => ({ name: key, count: stats[key] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Top 5 locations
  }, [houseData]);

  const userGrowthData = useMemo(() => {
    if (!userData?.data) return [];

    const stats = {};
    userData.data.forEach(user => {
        const date = new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        stats[date] = (stats[date] || 0) + 1;
    });

    // Convert to array and sort slightly by date (rough sort)
    return Object.keys(stats).map(key => ({ date: key, users: stats[key] }));
  }, [userData]);



  const {isAdminLogin} = useLoginAuth();

  const navigate = useNavigate();

  if(!isAdminLogin){
    console.log("unauthorized");
    navigate('/cimessadmin/login');
    return
  }
  return (

      <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Houses"
          value={totalHouses}
          icon={Home}
          color="bg-blue-500"
          loading={housesLoading}
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="bg-purple-500"
          loading={usersLoading}
        />
        <StatCard
          title="Active Listings"
          value={totalHouses} // Assuming all are active for now
          icon={Activity}
          color="bg-green-500"
          loading={housesLoading}
        />
        <StatCard
          title="Revenue (Est)"
          value="₦0.00"
          icon={DollarSign}
          color="bg-amber-500"
        />
        <StatCard
          title="Pending Reports"
          value={pendingReports}
          icon={Activity} // Or Bell
          color="bg-red-500"
          loading={reportsLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Location Chart */}
        <div className="glass-panel-light p-8 rounded-3xl border border-white/40 shadow-xl relative overflow-hidden">
             <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Properties by Location</h2>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                        <Tooltip
                            cursor={{fill: '#f3f4f6'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
        </div>

        {/* User Growth Chart */}
        <div className="glass-panel-light p-8 rounded-3xl border border-white/40 shadow-xl relative overflow-hidden">
             <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">User Signups</h2>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                         <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </div>
      </div>
    </div>

  );
};
