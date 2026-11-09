import { useState, useEffect } from 'react'
import { Download, WifiOff, X } from 'lucide-react'

export default function PWABadge() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    const onInstalled = () => setInstallPrompt(null)
    const goOnline = () => setIsOffline(false)
    const goOffline = () => setIsOffline(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const install = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  if (isOffline) {
    return (
      <aside className="pwa-badge offline" role="status">
        <WifiOff size={16} /> <span>Mode offline. Data tersimpan di perangkat tetap bisa dipakai.</span>
      </aside>
    )
  }
  if (installPrompt && !dismissed) {
    return (
      <aside className="pwa-badge" role="region" aria-label="Install aplikasi">
        <Download size={16} /> <span>Install aplikasi agar bisa dipakai offline.</span>
        <button className="btn small" onClick={install}>Install</button>
        <button className="icon-btn" onClick={() => setDismissed(true)} aria-label="Tutup"><X size={14} /></button>
      </aside>
    )
  }
  return null
}
