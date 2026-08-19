import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Utensils, AlertCircle, Syringe, Activity } from 'lucide-react'

const pets = [
  {
    id: '1',
    name: 'มะลิ',
    breed: 'โกลเด้น รีทรีฟเวอร์',
    age: '3 ปี',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
    careInfo: [
      { type: 'feeding', icon: Utensils, title: 'อาหาร', content: 'กินอาหารสุนัขยี่ห้อ Royal Canin วันละ 2 มื้อ (เช้า-เย็น)', color: 'amber' },
      { type: 'allergy', icon: AlertCircle, title: 'ข้อควรระวัง', content: 'แพ้อาหารทะเล ห้ามให้กินปลา', color: 'red' },
      { type: 'vaccination', icon: Syringe, title: 'วัคซีน', content: 'ฉีดครบแล้ว (ปีล่าสุด: มี.ค. 2026)', color: 'blue' }
    ]
  },
  {
    id: '2',
    name: 'โมจิ',
    breed: 'สก็อตติช โฟลด์',
    age: '2 ปี',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
    careInfo: [
      { type: 'feeding', icon: Utensils, title: 'อาหาร', content: 'อาหารเปียกและอาหารแห้งผสมกัน กินน้อยแต่บ่อยครั้ง', color: 'amber' },
      { type: 'behavior', icon: Activity, title: 'พฤติกรรม', content: 'ชอบอยู่เงียบๆ ไม่ชอบเสียงดัง ต้องการที่ซ่อน', color: 'purple' }
    ]
  }
]

const colorMap: Record<string, { bg: string; text: string; title: string }> = {
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', title: 'text-amber-800' },
  red: { bg: 'bg-red-50', text: 'text-red-700', title: 'text-red-800' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', title: 'text-blue-800' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', title: 'text-purple-800' }
}

export function PetsScreen() {
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">สัตว์เลี้ยงของฉัน</h1>
        <Link to="/my-pets/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" /> เพิ่มสัตว์เลี้ยง
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={pet.photo} alt={pet.name} className="h-16 w-16 rounded-full object-cover border-2 border-brand-100" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                    <p className="text-sm text-gray-500">{pet.breed} - {pet.age}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-brand-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {pet.careInfo.map(info => {
                  const colors = colorMap[info.color]
                  const Icon = info.icon
                  return (
                    <div key={info.type} className={`${colors.bg} rounded-lg p-3`}>
                      <div className={`flex items-center gap-2 ${colors.title} font-medium text-sm mb-1`}>
                        <Icon className="h-4 w-4" /> {info.title}
                      </div>
                      <p className={`text-sm ${colors.text}`}>{info.content}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

