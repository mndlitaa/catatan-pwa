import { CheckCircle2, Clock, NotebookPen } from 'lucide-react'

export default function HomePage({ notes, onGoNotes }) {
  const total = notes.length
  const done = notes.filter((n) => n.done).length
  const pending = total - done
  const upcoming = notes.filter((n) => !n.done && n.deadline).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 3)

  return (
    <section>
      <div className="hero">
        <h2>Halo, selamat datang! 👋</h2>
        <p>Catat tugas dan materi kuliahmu di sini. Aplikasi ini bisa di-install dan tetap jalan tanpa internet.</p>
        <button className="btn" onClick={onGoNotes}>Buka Catatan</button>
      </div>

      <div className="stats">
        <div className="stat"><NotebookPen /> <strong>{total}</strong><span>Total catatan</span></div>
        <div className="stat"><Clock /> <strong>{pending}</strong><span>Belum selesai</span></div>
        <div className="stat"><CheckCircle2 /> <strong>{done}</strong><span>Selesai</span></div>
      </div>

      <h3>Deadline terdekat</h3>
      {upcoming.length === 0 ? (
        <p className="muted">Belum ada deadline. Tambahkan di halaman Catatan.</p>
      ) : (
        <ul className="plain-list">
          {upcoming.map((n) => (
            <li key={n.id}><strong>{n.title}</strong> <span className="muted">· {n.course} · {n.deadline}</span></li>
          ))}
        </ul>
      )}
    </section>
  )
}
