import React from "react";
import { useList } from "@refinedev/core";
import { Users, Home, Activity, DollarSign } from "lucide-react";

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
  const { data: houseData, isLoading: housesLoading } = useList({
    resource: "houses",
    pagination: { pageSize: 1 }, // We only need the total count
  });

  const { data: userData, isLoading: usersLoading } = useList({
    resource: "users",
    pagination: { pageSize: 1 },
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

      {/* Recent Activity Placeholder */}
      <div className="glass-panel-light p-8 rounded-3xl border border-white/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 relative z-10">Recent Activity</h2>
        <div className="h-72 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-primary/20 rounded-2xl bg-white/50 backdrop-blur-sm group hover:border-primary/40 transition-colors">
          <Activity size={48} className="mb-4 text-primary/40 group-hover:text-primary transition-colors duration-500" />
          <p className="font-medium">Analytics Dashboard</p>
          <p className="text-sm mt-1 opacity-70">Coming soon in next update</p>
        </div>
      </div>
    </div>
  );
};
