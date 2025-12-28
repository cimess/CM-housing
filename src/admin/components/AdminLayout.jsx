import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Users,
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const { user, handleLogout } = useLoginAuth();

  // Mock Notifications
  const notifications = [
    { id: 1, message: "New user registered", time: "2 mins ago", read: false },
    { id: 2, message: "Property 'Lekki Luxury' reported", time: "1 hour ago", read: false },
    { id: 3, message: "System backup completed", time: "5 hours ago", read: true },
  ];

  const navItems = [
    { name: "Dashboard", path: "/cimessadmin", icon: LayoutDashboard },
    { name: "Houses", path: "/cimessadmin/houses", icon: Home },
    { name: "Users", path: "/cimessadmin/users", icon: Users },
    { name: "Reports", path: "/cimessadmin/reports", icon: Bell },
  ];

  const isActive = (path) => {
    if (path === "/cimessadmin" && location.pathname === "/cimessadmin") return true;
    if (path !== "/cimessadmin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 glass-panel-light backdrop-blur-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 border-r border-white/40 shadow-2xl`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-white/40">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25">
                CM
              </div>
              <span className="font-serif tracking-tight text-primary">Housing</span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300 group font-medium ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                    : "text-muted-foreground hover:bg-white/50 hover:text-black hover:translate-x-1"
                }`}
              >
                <item.icon
                  size={20}
                  className={isActive(item.path) ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors"}
                />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-white/40 bg-white/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/50 border border-white/40">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-white shadow-sm">
                {user?.firstname?.[0] || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.firstname || "Admin"}
                </p>
                <p className="text-xs text-gray-900 truncate">
                  {user?.email || "admin@cmhousing.com"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Bar */}
        <header className="h-20 glass-panel-light border-b border-white/40 flex items-center justify-between px-4 lg:px-8 shadow-sm z-40 sticky top-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/50 text-muted-foreground"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-6 ml-auto">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-full hover:bg-white/50 text-muted-foreground hover:text-primary transition-colors relative group"
              >
                <Bell size={22} className="group-hover:scale-110 transition-transform duration-200" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white pointer-events-none animate-pulse"></span>
                )}
              </button>

              {isNotificationsOpen && (
                  <div className="absolute right-0 mt-4 w-80 glass-panel-light rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 border border-white/40 ring-1 ring-black/5">
                    <div className="p-4 border-b border-white/40 flex justify-between items-center bg-white/40 backdrop-blur-md">
                      <h3 className="font-bold text-foreground font-serif">Notifications</h3>
                      <button className="text-xs text-primary font-bold hover:text-primary/80 transition-colors uppercase tracking-wider">Mark all read</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div key={notif.id} className={`p-4 hover:bg-white/60 transition-colors border-b border-white/10 cursor-pointer ${!notif.read ? 'bg-primary/5' : ''}`}>
                            <div className="flex gap-3">
                                <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!notif.read ? "bg-primary" : "bg-gray-300"}`} />
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1 leading-snug">{notif.message}</p>
                                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                                </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            <p>No new notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white/40 backdrop-blur-md border-t border-white/40 text-center">
                        <Link to="/cimessadmin/notifications" className="text-xs font-bold text-primary hover:underline" onClick={() => setIsNotificationsOpen(false)}>View all notifications</Link>
                    </div>
                  </div>
              )}
            </div>

            <div className="h-6 w-px bg-gray-300/50"></div>

            <Link to="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50/50">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
