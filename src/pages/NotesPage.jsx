import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, Search } from 'lucide-react'

const EMPTY = { title: '', course: '', deadline: '', description: '' }

export default function NotesPage({ notesApi }) {
  const { notes, loading, error, addNote, editNote, deleteNote, toggleDone } = notesApi
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [formError, setFormError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.course.trim()) {
      setFormError('Judul dan mata kuliah wajib diisi.')
      return
    }
    setFormError('')
    if (editingId) await editNote(editingId, form)
    else await addNote(form)
    setForm(EMPTY)
    setEditingId(null)
  }

  const startEdit = (note) => {
    setEditingId(note.id)
    setForm({ title: note.title, course: note.course, deadline: note.deadline || '', description: note.description || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(EMPTY)
    setFormError('')
  }

  const handleDelete = (note) => {
    if (window.confirm(`Hapus catatan "${note.title}"?`)) deleteNote(note.id)
  }

  const filtered = notes.filter((n) => `${n.title} ${n.course}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <section>
      <h2>Catatan & Tugas</h2>

      <form className="card form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Catatan' : 'Tambah Catatan'}</h3>
        <input name="title" placeholder="Judul (contoh: Laporan Praktikum PPB)" value={form.title} onChange={handleChange} />
        <input name="course" placeholder="Mata kuliah" value={form.course} onChange={handleChange} />
        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
        <textarea name="description" rows="3" placeholder="Deskripsi (opsional)" value={form.description} onChange={handleChange} />
        {formError && <p className="error">{formError}</p>}
        <div className="row">
          <button className="btn" type="submit"><Plus size={16} /> {editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
          {editingId && <button className="btn ghost" type="button" onClick={cancelEdit}>Batal</button>}
        </div>
      </form>

      <div className="search">
        <Search size={16} />
        <input placeholder="Cari judul atau mata kuliah..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {loading && <p className="muted">Memuat...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && filtered.length === 0 && <p className="muted">Belum ada catatan.</p>}

      <ul className="notes">
        {filtered.map((n) => (
          <li key={n.id} className={n.done ? 'card note done' : 'card note'}>
            <div className="note-body">
              <h4>{n.title}</h4>
              <p className="muted">{n.course}{n.deadline && ` · Deadline ${n.deadline}`}</p>
              {n.description && <p>{n.description}</p>}
            </div>
            <div className="note-actions">
              <button className="icon-btn" title="Tandai selesai" onClick={() => toggleDone(n)}><Check size={18} /></button>
              <button className="icon-btn" title="Edit" onClick={() => startEdit(n)}><Pencil size={18} /></button>
              <button className="icon-btn danger" title="Hapus" onClick={() => handleDelete(n)}><Trash2 size={18} /></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
