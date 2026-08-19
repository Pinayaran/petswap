import { useState } from 'react'
import { Calendar, PawPrint, CheckCircle, XCircle, Check } from 'lucide-react'

interface BookingItem {
  id: string;
  listingTitle: string;
  location: string;
  ownerName: string;
  dates: string;
  petName?: string;
  petType?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'declined';
  image: string;
  direction: 'outgoing' | 'incoming';
}

const mockBookings: BookingItem[] = [
  {
    id: '1', listingTitle: 'บ้านสวนสำหรับสุนัข', location: 'เชียงใหม่, หางดง',
    ownerName: 'คุณ ซาร่า', dates: '15 ส.ค. 2026 - 18 ส.ค. 2026',
    petName: 'มะลิ', status: 'pending', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop',
    direction: 'outgoing'
  },
  {
    id: '2', listingTitle: 'คอนโดแมวพร้อมระเบียงวิวสวน', location: 'กรุงเทพฯ, สุขุมวิท',
    ownerName: 'คุณ ไมค์', dates: '20 ส.ค. 2026 - 22 ส.ค. 2026',
    petName: 'โมจิ', status: 'confirmed', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
    direction: 'outgoing'
  },
  {
    id: '3', listingTitle: 'บ้านรับทุกสัตว์เลี้ยง', location: 'ภูเก็ต, ป่าตอง',
    ownerName: 'คุณ แอน', dates: '1 ส.ค. 2026 - 3 ส.ค. 2026',
    status: 'completed', image: '', direction: 'outgoing'
  },
  {
    id: '4', listingTitle: 'คำขอจอง: มะลิ', location: '',
    ownerName: 'คุณ นพดล', dates: '25 ส.ค. 2026 - 28 ส.ค. 2026',
    petName: 'มะลิ', petType: 'สุนัข', status: 'pending',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
    direction: 'incoming'
  },
  {
    id: '5', listingTitle: 'คำขอจอง: โมจิ', location: '',
    ownerName: 'คุณ วรรณา', dates: '10 ส.ค. 2026 - 12 ส.ค. 2026',
    petName: 'โมจิ', petType: 'แมว', status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
    direction: 'incoming'
  }
]

const statusConfig = {
  pending: { label: 'รอการยืนยัน', class: 'badge-yellow' },
  confirmed: { label: 'ยืนยันแล้ว', class: 'badge-green' },
  completed: { label: 'เสร็จสิ้น', class: 'badge-gray' },
  declined: { label: 'ปฏิเสธ', class: 'badge-red' }
}

export function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'outgoing' | 'incoming'>('outgoing')
  const filtered = mockBookings.filter(b => b.direction === activeTab)

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">การจอง</h1>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
        <button
          onClick={() => setActiveTab('outgoing')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'outgoing' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          คำขอที่ฉันส่ง
        </button>
        <button
          onClick={() => setActiveTab('incoming')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'incoming' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          คำขอที่ได้รับ
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map(booking => {
          const status = statusConfig[booking.status]
          return (
            <div key={booking.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${booking.status === 'completed' ? 'opacity-75' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {booking.image ? (
                    <img src={booking.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      <PawPrint className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{booking.listingTitle}</h3>
                      {booking.petType && <span className="badge-brand">{booking.petType}</span>}
                    </div>
                    <p className="text-sm text-gray-500">
                      {booking.direction === 'incoming' ? `จาก: ${booking.ownerName}` : `${booking.location} - ${booking.ownerName}`}
                      {booking.direction === 'incoming' && booking.petName && ` - ${booking.petName}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{booking.dates}</span>
                      {booking.petName && booking.direction === 'outgoing' && (
                        <><span className="mx-1">-</span><PawPrint className="h-3.5 w-3.5" /><span>{booking.petName}</span></>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={status.class}>{status.label}</span>
                  {booking.status === 'pending' && booking.direction === 'outgoing' && (
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1.5 border border-red-200 rounded-lg hover:bg-red-50">ยกเลิก</button>
                  )}
                  {booking.status === 'confirmed' && booking.direction === 'outgoing' && (
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1.5 border border-red-200 rounded-lg hover:bg-red-50">ยกเลิก</button>
                  )}
                  {booking.status === 'pending' && booking.direction === 'incoming' && (
                    <>
                      <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> ยืนยัน
                      </button>
                      <button className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 border border-red-200 flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" /> ปฏิเสธ
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && booking.direction === 'incoming' && (
                    <button className="bg-brand-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-brand-700 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> เสร็จสิ้น
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

