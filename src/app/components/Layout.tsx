import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Home, LayoutDashboard, Search, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && (
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-8">
                <Link to="/" className="font-bold text-xl text-blue-600">
                  Sistema de Apoio
                </Link>

                <div className="hidden md:flex gap-4">
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      isActive('/dashboard')
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <Link
                    to="/missing"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      isActive('/missing')
                        ? 'bg-orange-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search className="w-4 h-4" />
                    Desaparecidos
                  </Link>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="text-sm">
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-gray-600 text-xs">
                    {user?.type === 'volunteer' ? 'Voluntário' : 'Necessitado'}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden border-t py-4 space-y-2">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isActive('/dashboard')
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <Link
                  to="/missing"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isActive('/missing')
                      ? 'bg-orange-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search className="w-4 h-4" />
                  Desaparecidos
                </Link>

                <div className="px-4 py-2 border-t mt-2 pt-4">
                  <div className="font-semibold mb-1">{user?.name}</div>
                  <div className="text-gray-600 text-sm mb-3">
                    {user?.type === 'volunteer' ? 'Voluntário' : 'Necessitado'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
