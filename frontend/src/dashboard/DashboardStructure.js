import React, { useEffect, useState } from "react";
import { Bell, ChevronFirst, ChevronLast, FileText, LayoutDashboard, Receipt, Tags, User, Wallet } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardStructure = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const location = useLocation();

  
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/home" },
    { icon: Receipt, label: "Transactions", path: "/home/transactions" },
    { icon: Wallet, label: "Accounts", path: "/home/accounts" },
    { icon: FileText, label: "Reports", path: "/home/reports" },
    { icon: Tags, label: "Categories", path: "/home/categories" }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out bg-white border-r shadow-sm flex flex-col fixed h-full`}>
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && <span className="text-xl font-semibold text-gray-800">my pro Wallet</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            {collapsed ? <ChevronLast size={20} /> : <ChevronFirst size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-x-3 p-2 rounded-lg w-full ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} transition-colors ${collapsed ? 'justify-center' : ''}`}
                  >
                    <Icon size={20} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t p-4 relative">
          <button onClick={() => setShowUserMenu(!showUserMenu)} className={`${collapsed ? 'justify-center' : ''} flex items-center gap-x-3`}>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            {!collapsed && user && (
              <div className="flex-1 text-left">
                <h4 className="text-sm font-semibold text-gray-700">{user.name}</h4>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            )}
          </button>

          {showUserMenu && !collapsed && (
            <div className="absolute bottom-16 left-4 w-52 bg-white rounded-lg shadow-lg border mt-2 p-2 z-50">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => {/* Show Profile Modal */}}>View Profile</button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </aside>

      <main className={`${collapsed ? 'ml-16' : 'ml-64'} transition-all duration-300 flex-1 flex flex-col`}>
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">{menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}</h1>
          <div className="flex items-center gap-x-4">
            <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardStructure;
