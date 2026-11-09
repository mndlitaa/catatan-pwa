import { useState, useEffect, useCallback } from 'react'
import noteService from '../services/noteService'

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setNotes(await noteService.getAll())
    } catch (err) {
      setError(err.message || 'Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addNote = async (data) => {
    await noteService.create(data)
    await load()
  }
  const editNote = async (id, data) => {
    await noteService.update(id, data)
    await load()
  }
  const deleteNote = async (id) => {
    await noteService.remove(id)
    await load()
  }
  const toggleDone = async (note) => editNote(note.id, { done: !note.done })

  return { notes, loading, error, addNote, editNote, deleteNote, toggleDone }
}
