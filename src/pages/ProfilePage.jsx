import { User } from 'lucide-react'

const PROFILE = {
  nama: 'Amanda Lalita Tri Gunawan',
  nim: '21120124130076',
  kelompok: 'Kelompok 37',
}

export default function ProfilePage() {
  return (
    <section>
      <h2>Profil</h2>
      <div className="card profile">
        <div className="avatar"><User size={40} /></div>
        <dl>
          <dt>Nama</dt><dd>{PROFILE.nama}</dd>
          <dt>NIM</dt><dd>{PROFILE.nim}</dd>
          <dt>Kelompok</dt><dd>{PROFILE.kelompok}</dd>
        </dl>
      </div>
    </section>
  )
}
