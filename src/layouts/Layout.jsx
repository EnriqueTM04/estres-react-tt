import React, { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/sidebar/Sidebar.jsx';
import ConfidentialityAgreementModal from '../components/ConfidentialityAgreementModal.jsx';
import logo from "../assets/Isotipo-Logo Final-03.svg";

export default function Layout() {
  const { user, error, acceptConfidentialityAgreement } = useAuth({ middleware: 'auth' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  useEffect(() => {
    if (!user?.id || !user?.role) {
      setAgreementAccepted(false);
      return;
    }

    if (!['psicologo', 'admin'].includes(user.role)) {
      setAgreementAccepted(true);
      return;
    }

    const key = `VIDAZEN_CONF_AGREEMENT_${user.id}_${user.role}`;
    const raw = localStorage.getItem(key);

    if (!raw) {
      setAgreementAccepted(false);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      setAgreementAccepted(Boolean(parsed?.accepted));
    } catch {
      setAgreementAccepted(false);
    }
  }, [user?.id, user?.role]);

  const requiresAgreement =
    ['psicologo', 'admin'].includes(user?.role) &&
    !agreementAccepted;

  const handleAcceptAgreement = async (payload) => {
    await acceptConfidentialityAgreement(payload);
    setAgreementAccepted(true);
  };

  return (
    <div className="bg-[#FBFCFC] dark:bg-[#1a252f] min-h-screen flex text-[#2C3E50] dark:text-[#FBFCFC] antialiased">

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');
          body { font-family: 'Nunito Sans', sans-serif; }
        `}
      </style>

      <ConfidentialityAgreementModal
        open={Boolean(requiresAgreement)}
        onAccept={handleAcceptAgreement}
      />

      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      {isMobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-opacity"
        ></div>
      )}

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">

        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#2C3E50] shadow-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo VidaZen" className="w-8 h-8" />
            <span className="text-xl font-bold text-white tracking-wide font-['Nunito_Sans']">VidaZen</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white hover:text-[#A2D9CE] transition-colors p-1"
          >
            <Menu size={28} />
          </button>
        </header>

        <main className="flex-1 w-full h-full p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}