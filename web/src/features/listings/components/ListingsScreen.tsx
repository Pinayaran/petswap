import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2 } from 'lucide-react'

const myListings = [
  {
    id: '1',
    title: 'บ้านสวนสำหรับสุนัข',
    location: 'เชียงใหม่, หางดง',
    status: 'published' as const,
    petTypes: ['สุนัข'],
    capacity: 3,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop'
  }
]

export function ListingsScreen() {
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ที่พักของฉัน</h1>
        <Link to="/my-listings/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" /> สร้างที่พักใหม่
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myListings.map(listing => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="bg-white/90 backdrop-blur p-1.5 rounded-lg hover:bg-white text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="bg-white/90 backdrop-blur p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                <span className="badge-green">{listing.status === 'published' ? 'เผยแพร่' : listing.status}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{listing.location}</p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                {listing.petTypes.map(t => (
                  <span key={t} className="badge-brand">{t}</span>
                ))}
                <span className="badge-brand">รับ {listing.capacity} ตัว</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

