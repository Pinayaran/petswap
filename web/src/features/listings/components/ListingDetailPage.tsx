import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, CheckCircle, Check, Calendar, PawPrint } from 'lucide-react'
import { useState } from 'react'

const mockListing = {
  id: '1',
  title: 'บ้านสวนสำหรับสุนัข',
  location: 'เชียงใหม่, หางดง',
  price: 350,
  petTypes: ['สุนัข'],
  capacity: 3,
  description: 'บ้านสวนขนาดใหญ่พร้อมสนามหญ้าสำหรับสุนัขเล่น มีรั้วล้อมรอบปลอดภัย อยู่ใกล้ธรรมชาติ อากาศดี มีห้องแอร์ให้สุนัขพักผ่อน รับประทานอาหารตามเวลาที่กำหนด มีประสบการณ์ดูแลสุนัขมากกว่า 5 ปี',
  facilities: ['สนามหญ้า', 'ห้องแอร์', 'กล้องวงจรปิด', 'รั้วล้อมรอบ', 'อัปเดตรูปทุกวัน', 'ใกล้คลินิกสัตว์'],
  image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop',
  owner: { name: 'คุณ ซาร่า', avatar: 'https://ui-avatars.com/api/?name=Sara&background=0d9488&color=fff&size=64', memberSince: 'ม.ค. 2024', reviews: 24 }
}

const mockPets = [
  { id: '1', name: 'มะลิ', type: 'สุนัข' },
  { id: '2', name: 'โมจิ', type: 'แมว' }
]

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedPet, setSelectedPet] = useState(mockPets[0].id)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const nights = startDate && endDate 
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 3

  const total = mockListing.price * nights + 50

  const handleBooking = () => {
    navigate('/bookings')
  }

  return (
    <div className="page-container">
      <Link to="/" className="mb-4 text-gray-500 hover:text-brand-600 flex items-center gap-1 text-sm">
        <ArrowLeft className="h-4 w-4" /> กลับไปหน้าค้นหา
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="h-80 bg-gray-200">
              <img src={mockListing.image} alt={mockListing.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{mockListing.title}</h1>
                  <p className="text-gray-500 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {mockListing.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-600">฿{mockListing.price}</div>
                  <div className="text-sm text-gray-500">ต่อคืน</div>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                {mockListing.petTypes.map(t => (
                  <span key={t} className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">{t}</span>
                ))}
                <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">รับ {mockListing.capacity} ตัว</span>
                <span className="badge-green flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> ว่าง
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">รายละเอียด</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{mockListing.description}</p>

              <h3 className="font-semibold text-gray-900 mb-3">สิ่งอำนวยความสะดวก</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {mockListing.facilities.map(f => (
                  <div key={f} className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-brand-500" /> {f}
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">เจ้าของที่พัก</h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <img src={mockListing.owner.avatar} alt={mockListing.owner.name} className="h-12 w-12 rounded-full" />
                <div>
                  <div className="font-medium text-gray-900">{mockListing.owner.name}</div>
                  <div className="text-sm text-gray-500">สมาชิกตั้งแต่ {mockListing.owner.memberSince} - รีวิว {mockListing.owner.reviews} รายการ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">จองที่พัก</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เลือกสัตว์เลี้ยง</label>
                <select 
                  value={selectedPet} 
                  onChange={(e) => setSelectedPet(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  {mockPets.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">วันที่รับ</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">วันที่ส่งคืน</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                />
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">฿{mockListing.price} x {nights} คืน</span>
                  <span>฿{mockListing.price * nights}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-600">ค่าบริการ</span>
                  <span>฿50</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>รวม</span>
                  <span>฿{total}</span>
                </div>
              </div>
              <button onClick={handleBooking} className="w-full btn-primary flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" /> ส่งคำขอจอง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

