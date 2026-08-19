import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ImagePlus } from 'lucide-react'

const PET_TYPES = ['สุนัข', 'แมว', 'กระต่าย', 'นก']
const FACILITIES = ['สนามหญ้า', 'ห้องแอร์', 'กล้องวงจรปิด', 'รั้วล้อมรอบ', 'อัปเดตรูปทุกวัน', 'ใกล้คลินิกสัตว์']

export function CreateListingPage() {
  const navigate = useNavigate()
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>(['สุนัข'])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])

  const togglePetType = (type: string) => {
    setSelectedPetTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/my-listings')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/my-listings" className="mb-4 text-gray-500 hover:text-brand-600 flex items-center gap-1 text-sm">
        <ArrowLeft className="h-4 w-4" /> กลับไปที่พักของฉัน
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">สร้างที่พักใหม่</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อที่พัก *</label>
          <input type="text" placeholder="เช่น บ้านสวนสำหรับสุนัข" className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่ / สถานที่ *</label>
          <input type="text" placeholder="เช่น เชียงใหม่, หางดง" className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด *</label>
          <textarea rows={4} placeholder="อธิบายเกี่ยวกับที่พักของคุณ..." className="input-field" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ความจุ (จำนวนตัว) *</label>
            <input type="number" min={1} defaultValue={1} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ราคาต่อคืน (บาท) *</label>
            <input type="number" min={0} placeholder="350" className="input-field" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ประเภทสัตว์ที่รับ *</label>
          <div className="flex flex-wrap gap-2">
            {PET_TYPES.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => togglePetType(type)}
                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                  selectedPetTypes.includes(type)
                    ? 'bg-brand-50 border-brand-500 text-brand-700'
                    : 'border-gray-200 hover:bg-brand-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">สิ่งอำนวยความสะดวก</label>
          <div className="grid grid-cols-2 gap-2">
            {FACILITIES.map(facility => (
              <label key={facility} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFacilities.includes(facility)}
                  onChange={() => toggleFacility(facility)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-600">{facility}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">รูปภาพ</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-400 transition-colors cursor-pointer">
            <ImagePlus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">คลิกเพื่ออัปโหลดรูปภาพ</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={() => navigate('/my-listings')} className="flex-1 btn-secondary">ยกเลิก</button>
          <button type="submit" className="flex-1 btn-primary">บันทึกที่พัก</button>
        </div>
      </form>
    </div>
  )
}

