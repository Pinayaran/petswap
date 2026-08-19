import { Link } from 'react-router-dom'
import { Search, MapPin, Star, Filter } from 'lucide-react'

const listings = [
  {
    id: '1',
    title: 'บ้านสวนสำหรับสุนัข',
    location: 'เชียงใหม่, หางดง',
    price: 350,
    rating: 4.9,
    petTypes: ['สุนัข'],
    capacity: 3,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
    owner: { name: 'คุณ ซาร่า', avatar: 'https://ui-avatars.com/api/?name=Sara&background=0d9488&color=fff' }
  },
  {
    id: '2',
    title: 'คอนโดแมวพร้อมระเบียงวิวสวน',
    location: 'กรุงเทพฯ, สุขุมวิท',
    price: 280,
    rating: 4.7,
    petTypes: ['แมว'],
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
    owner: { name: 'คุณ ไมค์', avatar: 'https://ui-avatars.com/api/?name=Mike&background=0d9488&color=fff' }
  },
  {
    id: '3',
    title: 'บ้านรับทุกสัตว์เลี้ยง',
    location: 'ภูเก็ต, ป่าตอง',
    price: 200,
    rating: 5.0,
    petTypes: ['สุนัข', 'แมว'],
    capacity: 5,
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=400&fit=crop',
    owner: { name: 'คุณ แอน', avatar: 'https://ui-avatars.com/api/?name=Ann&background=0d9488&color=fff' }
  }
]

export function SearchScreen() {
  return (
    <div>
      <div className="bg-brand-600 text-white py-12">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-2">ค้นหาที่พักสำหรับสัตว์เลี้ยง</h1>
          <p className="text-brand-100 mb-6">พบผู้ดูแลที่เหมาะสมกับสัตว์เลี้ยงของคุณ</p>
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="สถานที่ (เช่น กรุงเทพฯ, เชียงใหม่)" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="คำค้นหา..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <button className="bg-brand-600 text-white px-6 py-2.5 rounded-lg hover:bg-brand-700 font-medium flex items-center justify-center gap-2">
              <Search className="h-5 w-5" /> ค้นหา
            </button>
          </div>
        </div>
      </div>

      <div className="page-container">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-4 w-4" /> ตัวกรอง:
          </span>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option>ทุกประเภทสัตว์</option>
            <option>สุนัข</option>
            <option>แมว</option>
            <option>กระต่าย</option>
            <option>นก</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option>ความจุ: ทั้งหมด</option>
            <option>1-2 ตัว</option>
            <option>3-5 ตัว</option>
            <option>5+ ตัว</option>
          </select>
          <input type="date" className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
          <span className="text-gray-400">ถึง</span>
          <input type="date" className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <Link key={listing.id} to={`/listing/${listing.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover block">
              <div className="h-48 bg-gray-200 relative">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-medium text-brand-700 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> {listing.rating}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                  <span className="text-brand-600 font-bold">฿{listing.price}/คืน</span>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                  <MapPin className="h-3.5 w-3.5" /> {listing.location}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  {listing.petTypes.map(type => (
                    <span key={type} className="badge-brand">{type}</span>
                  ))}
                  <span className="badge-brand">รับ {listing.capacity} ตัว</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <img src={listing.owner.avatar} alt={listing.owner.name} className="h-6 w-6 rounded-full" />
                  <span className="text-sm text-gray-600">{listing.owner.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

