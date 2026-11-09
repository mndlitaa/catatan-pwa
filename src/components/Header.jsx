import { Home, NotebookPen, User } from 'lucide-react'

const TABS = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'notes', label: 'Catatan', icon: NotebookPen },
  { id: 'profile', label: 'Profil', icon: User },
]

export default function Header({ tab, onTab }) {
  return (
    <>
      <header className="topbar">
        <h1>📓 Catatan Kuliah</h1>
        <nav className="nav-desktop">
          {TABS.map(({ id, label }) => (
            <button key={id} className={tab === id ? 'nav-link active' : 'nav-link'} onClick={() => onTab(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>
      <nav className="nav-mobile">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} className={tab === id ? 'tab active' : 'tab'} onClick={() => onTab(id)}>
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
