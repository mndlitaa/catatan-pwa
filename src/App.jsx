import { useState } from 'react'
import Header from './components/Header.jsx'
import PWABadge from './components/PWABadge.jsx'
import HomePage from './pages/HomePage.jsx'
import NotesPage from './pages/NotesPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useNotes } from './hooks/useNotes.js'

export default function App() {
  const [tab, setTab] = useState('home')
  const notesApi = useNotes()

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} />
      <main className="main">
        {tab === 'home' && <HomePage notes={notesApi.notes} onGoNotes={() => setTab('notes')} />}
        {tab === 'notes' && <NotesPage notesApi={notesApi} />}
        {tab === 'profile' && <ProfilePage />}
      </main>
      <PWABadge />
    </div>
  )
}
