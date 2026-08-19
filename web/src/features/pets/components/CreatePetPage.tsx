import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'

const PET_TYPES = ['สุนัข', 'แมว', 'กระต่าย', 'นก', 'อื่นๆ']

interface CareField {
  key: string;
  label: string;
  placeholder: string;
}

const CARE_FIELDS: CareField[] = [
  { key: 'feeding', label: 'อาหาร / การให้อาหาร', placeholder: 'รายละเอียดอาหาร เวลา ปริมาณ...' },
  { key: 'medical', label: 'ข้อมูลทางการแพทย์ / วัคซีน', placeholder: 'วัคซีน ประวัติการเจ็บป่วย...' },
  { key: 'behavior', label: 'พฤติกรรม / นิสัย', placeholder: 'ชอบ/ไม่ชอบอะไร นิสัยพิเศษ...' },
  { key: 'allergy', label: 'อาการแพ้ / ข้อห้าม', placeholder: 'อาหารหรือสิ่งที่แพ้...' },
  { key: 'notes', label: 'บันทึกอื่นๆ', placeholder: 'ข้อมูลเพิ่มเติม...' }
]

export function CreatePetPage() {
  const navigate = useNavigate()
  const [careData, setCareData] = useState<Record<string, string>>({})

  const handleCareChange = (key: string, value: string) => {
    setCareData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/my-pets')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/my-pets" className="mb-4 text-gray-500 hover:text-brand-600 flex items-center gap-1 text-sm">
        <ArrowLeft className="h-4 w-4" /> กลับไปสัตว์เลี้ยงของฉัน
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">เพิ่มสัตว์เลี้ยง</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-brand-400 transition-colors">
            <Camera className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ *</label>
            <input type="text" className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ประเภท *</label>
            <select className="input-field" required>
              {PET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">พันธุ์</label>
            <input type="text" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อายุ</label>
            <input type="text" placeholder="เช่น 3 ปี" className="input-field" />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">ข้อมูลการดูแล</h3>
          <div className="space-y-4">
            {CARE_FIELDS.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <textarea
                  rows={2}
                  value={careData[field.key] || ''}
                  onChange={(e) => handleCareChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="input-field"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={() => navigate('/my-pets')} className="flex-1 btn-secondary">ยกเลิก</button>
          <button type="submit" className="flex-1 btn-primary">บันทึก</button>
        </div>
      </form>
    </div>
  )
}

