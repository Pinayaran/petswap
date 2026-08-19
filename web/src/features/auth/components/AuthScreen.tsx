import { useState } from 'react'
import { PawPrint } from 'lucide-react'

interface LoginPageProps {
  onLogin: () => void;
}

export function AuthScreen({ onLogin }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">
        <div className="text-center mb-8">
          <PawPrint className="h-12 w-12 text-brand-600 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">PetSitter</h1>
          <p className="text-gray-500 mt-1">แพลตฟอร์มจัดหาผู้ดูแลสัตว์เลี้ยงที่เชื่อถือได้</p>
        </div>

        {isRegister ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4">สมัครสมาชิก</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                <input type="email" placeholder="your@email.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
                <input type="password" placeholder="********" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อที่แสดง</label>
                <input type="text" placeholder="ชื่อของคุณ" className="input-field" />
              </div>
              <button type="submit" className="w-full btn-primary">สมัครสมาชิก</button>
              <p className="text-center text-sm text-gray-500">
                มีบัญชีแล้ว? <button type="button" onClick={() => setIsRegister(false)} className="text-brand-600 font-medium hover:underline">เข้าสู่ระบบ</button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4">เข้าสู่ระบบ</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                <input type="email" defaultValue="user@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
                <input type="password" defaultValue="password" className="input-field" />
              </div>
              <button type="submit" className="w-full btn-primary">เข้าสู่ระบบ</button>
              <p className="text-center text-sm text-gray-500">
                ยังไม่มีบัญชี? <button type="button" onClick={() => setIsRegister(true)} className="text-brand-600 font-medium hover:underline">สมัครสมาชิก</button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

