import { useState } from 'react'
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import StudentCard from './components/StudentCard.jsx'
import StudentForm from './components/StudentForm.jsx'
import Footer from './components/Footer.jsx'
import slimImage from './assets/slim.svg'
import sarraImage from './assets/sarra.svg'
import mariemImage from './assets/mariem.svg'
import './App.css'

function App() {
  const [etudiants, setEtudiants] = useState([
    { id: 1, prenom: 'Slim', nom: 'Boubaker', email: 'slimboubaker@gmail.com', telephone: '+216 99 999 999', filiere: 'GLSI', anneeEtude: '2ème année', groupe: 'GLSI 2', ville: 'Mahdia', image: slimImage },
    { id: 2, prenom: 'Sarra', nom: 'Trabelsi', email: 'sarra.trabelsi@gmail.com', telephone: '+216 22 345 678', filiere: 'GLSI', anneeEtude: '2ème année', groupe: 'GLSI 1', ville: 'Sousse', image: sarraImage },
    { id: 3, prenom: 'Mariem', nom: 'Khalfallah', email: 'mariem.khalfallah@gmail.com', telephone: '+216 27 567 890', filiere: 'GLSI', anneeEtude: '2ème année', groupe: 'GLSI 2', ville: 'Non renseignée', image: mariemImage },
  ])
  const [etudiantAModifier, setEtudiantAModifier] = useState(null)

  function ajouterEtudiant(nouvelEtudiant) {
    const etudiantAvecId = { ...nouvelEtudiant, image: nouvelEtudiant.image || slimImage, id: Date.now() }
    setEtudiants((prev) => [...prev, etudiantAvecId])
  }

  function modifierEtudiant(etudiant) {
    setEtudiantAModifier(etudiant)
    document.getElementById('student-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function enregistrerModification(etudiantModifie) {
    setEtudiants((prev) => prev.map((etudiant) => etudiant.id === etudiantAModifier.id
      ? { ...etudiantModifie, id: etudiant.id }
      : etudiant))
    setEtudiantAModifier(null)
  }

  function supprimerEtudiant(id) {
    const etudiant = etudiants.find((item) => item.id === id)
    if (!etudiant || !window.confirm(`Supprimer ${etudiant.prenom} ${etudiant.nom} ?`)) return
    setEtudiants((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="app-shell">
      <Header />
      <Navbar />
      <main className="main-content">
        <StudentForm
          key={etudiantAModifier ? etudiantAModifier.id : 'nouveau'}
          onAjouterEtudiant={ajouterEtudiant}
          etudiantAModifier={etudiantAModifier}
          onModifierEtudiant={enregistrerModification}
          onAnnuler={() => setEtudiantAModifier(null)}
        />
        <section className="students-section" aria-labelledby="students-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Année universitaire 2026–2027</p>
              <h2 id="students-title">Liste des étudiants</h2>
            </div>
            <button className="add-student-button" type="button" onClick={() => document.getElementById('student-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Ajouter un étudiant
            </button>
          </div>
          <div className="students-grid">
            {etudiants.map((etudiant) => (
              <StudentCard key={etudiant.id} {...etudiant}
                onUpdate={() => modifierEtudiant(etudiant)}
                onDelete={() => supprimerEtudiant(etudiant.id)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
