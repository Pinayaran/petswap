import { Link, useNavigate } from 'react-router-dom'
import { PawPrint, Search, Calendar, Home, Heart, User, LogOut } from 'lucide-react'

export function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
    window.location.reload()
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <PawPrint className="h-8 w-8 text-brand-600 mr-2" />
            <span className="text-xl font-bold text-brand-700">PetSitter</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
              <Search className="h-4 w-4" /> ค้นหา
            </Link>
            <Link to="/bookings" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" /> การจอง
            </Link>
            <Link to="/my-listings" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
              <Home className="h-4 w-4" /> ที่พักของฉัน
            </Link>
            <Link to="/my-pets" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
              <Heart className="h-4 w-4" /> สัตว์เลี้ยง
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-600 hover:text-brand-600 px-3 py-2">
                <img src="https://ui-avatars.com/api/?name=User&background=0d9488&color=fff" className="h-8 w-8 rounded-full" alt="profile" />
                <span className="text-sm font-medium">บัญชีของฉัน</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50">แก้ไขโปรไฟล์</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">ออกจากระบบ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

