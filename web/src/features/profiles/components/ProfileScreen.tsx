import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera } from 'lucide-react'

export function ProfileScreen() {
  const [formData, setFormData] = useState({
    displayName: 'ผู้ใช้ทดสอบ',
    email: 'user@example.com',
    phone: '081-234-5678',
    location: 'กรุงเทพมหานคร'
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">แก้ไขโปรไฟล์</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src="https://ui-avatars.com/api/?name=User&background=0d9488&color=fff&size=128" alt="profile" className="h-24 w-24 rounded-full" />
            <button className="absolute bottom-0 right-0 bg-brand-600 text-white p-1.5 rounded-full hover:bg-brand-700">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">รูปโปรไฟล์</h3>
            <p className="text-sm text-gray-500">คลิกที่รูปเพื่ออัปโหลดรูปใหม่</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อที่แสดง *</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่ / จังหวัด</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Link to="/" className="flex-1 btn-secondary text-center">ยกเลิก</Link>
          <button className="flex-1 btn-primary">บันทึกโปรไฟล์</button>
        </div>
      </div>
    </div>
  )
}

