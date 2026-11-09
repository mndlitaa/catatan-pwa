// Service CRUD. Data disimpan di localStorage sehingga tetap ada saat offline.
// Semua method mengembalikan Promise agar mudah diganti ke REST API (axios) nanti.
const KEY = 'catatan_kuliah_notes'

const read = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
const write = (list) => localStorage.setItem(KEY, JSON.stringify(list))

const noteService = {
  async getAll() {
    return read()
  },
  async create(data) {
    const note = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), done: false, ...data }
    write([note, ...read()])
    return note
  },
  async update(id, data) {
    const list = read().map((n) => (n.id === id ? { ...n, ...data } : n))
    write(list)
    return list.find((n) => n.id === id)
  },
  async remove(id) {
    write(read().filter((n) => n.id !== id))
    return true
  },
}

export default noteService
