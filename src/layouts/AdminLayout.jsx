import React from 'react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import HeaderAuth from '../components/header/HeaderAuth.jsx'
import ConfidentialityAgreementModal from '../components/ConfidentialityAgreementModal.jsx'

export default function AdminLayout() {
  const { user, acceptConfidentialityAgreement } = useAuth({ middleware: 'auth' })
  const [agreementAccepted, setAgreementAccepted] = useState(false)

  useEffect(() => {
    if (!user?.id || !user?.role) {
      setAgreementAccepted(false)
      return
    }

    if (!['psicologo', 'admin'].includes(user.role)) {
      setAgreementAccepted(true)
      return
    }

    const key = `VIDAZEN_CONF_AGREEMENT_${user.id}_${user.role}`
    const raw = localStorage.getItem(key)

    if (!raw) {
      setAgreementAccepted(false)
      return
    }

    try {
      const parsed = JSON.parse(raw)
      setAgreementAccepted(Boolean(parsed?.accepted))
    } catch {
      setAgreementAccepted(false)
    }
  }, [user?.id, user?.role])

  const requiresAgreement =
    ['psicologo', 'admin'].includes(user?.role) &&
    !agreementAccepted

  const handleAcceptAgreement = async (payload) => {
    await acceptConfidentialityAgreement(payload)
    setAgreementAccepted(true)
  }

  return (
    <div>
      <ConfidentialityAgreementModal
        open={Boolean(requiresAgreement)}
        onAccept={handleAcceptAgreement}
      />

      <HeaderAuth />

      <Outlet />
    </div>
  )
}
