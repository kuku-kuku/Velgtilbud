import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingForm from '@/components/ui/FloatingForm'
import FormModal from '@/components/ui/FormModal'
import HomePage from '@/pages/HomePage'
import PrivatePage from '@/pages/PrivatePage'
import BedrifterPage from '@/pages/BedrifterPage'
import PartnerPage from '@/pages/PartnerPage'
import OmOssPage from '@/pages/OmOssPage'
import AdminPage from '@/pages/AdminPage'
import type { ServiceType } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Mobile: floating button → opens modal (FloatingForm is desktop-only)
function MobileButton({ onOpen }: { onOpen: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <button
      onClick={onOpen}
      className={`lg:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-5 py-3 bg-navy text-white font-bold text-sm rounded-2xl shadow-2xl transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
    >
      Få gratis tilbud <ArrowRight className="w-4 h-4" />
    </button>
  )
}

export default function App() {
  const [modalOpen,    setModalOpen]    = useState(false)
  const [modalService, setModalService] = useState<ServiceType>('flytting')

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header onOpenModal={() => setModalOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/privatpersoner" element={<PrivatePage />} />
            <Route path="/bedrifter"      element={<BedrifterPage />} />
            <Route path="/bli-partner"    element={<PartnerPage />} />
            <Route path="/om-oss"         element={<OmOssPage />} />
            <Route path="/admin"          element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Desktop: always-visible floating form */}
      <FloatingForm />

      {/* Mobile: floating button → modal */}
      <MobileButton onOpen={() => setModalOpen(true)} />
      <FormModal
        open={modalOpen}
        service={modalService}
        onClose={() => setModalOpen(false)}
        onServiceChange={setModalService}
      />
    </BrowserRouter>
  )
}
