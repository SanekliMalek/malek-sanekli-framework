import { useEffect, useState } from 'react'
import './StudentForm.css'

const champsVides = { nom: '', prenom: '', email: '', telephone: '', filiere: '', anneeEtude: '', groupe: '', ville: '', image: '' }

function StudentForm({ onAjouterEtudiant, etudiantAModifier, onModifierEtudiant, onAnnuler }) {
  const [formData, setFormData] = useState(() => ({ ...champsVides, ...etudiantAModifier }))
  const [erreurs, setErreurs] = useState({})
  const [soumis, setSoumis] = useState(false)
  const [ajoutReussi, setAjoutReussi] = useState(false)

  useEffect(() => {
    if (!ajoutReussi) return undefined
    const timeout = window.setTimeout(() => setAjoutReussi(false), 2500)
    return () => window.clearTimeout(timeout)
  }, [ajoutReussi])

  function handleChange(e) {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      const fichier = files?.[0]
      if (fichier) setFormData((prev) => ({ ...prev, image: URL.createObjectURL(fichier) }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validerFormulaire() {
    const nouvellesErreurs = {}
    if (!formData.nom.trim()) nouvellesErreurs.nom = 'Nom est obligatoire'
    if (!formData.prenom.trim()) nouvellesErreurs.prenom = 'Prénom est obligatoire'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nouvellesErreurs.email = 'Email invalide'
    if (!formData.telephone.trim()) nouvellesErreurs.telephone = 'Téléphone est obligatoire'
    if (!formData.filiere) nouvellesErreurs.filiere = 'Filière est obligatoire'
    setErreurs(nouvellesErreurs)
    return Object.keys(nouvellesErreurs).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Avant soumission :', formData)
    setSoumis(true)
    if (!validerFormulaire()) return
    const nouvelEtudiant = { ...formData }
    if (etudiantAModifier) {
      onModifierEtudiant({ ...etudiantAModifier, ...nouvelEtudiant })
    } else {
      onAjouterEtudiant(nouvelEtudiant)
      setFormData(champsVides)
      const champImage = document.getElementById('student-image')
      if (champImage) champImage.value = ''
      setAjoutReussi(true)
    }
    setErreurs({})
    setSoumis(false)
  }

  function champ({ name, label, type = 'text', required = false, placeholder, options }) {
    const invalide = Boolean(erreurs[name])
    return (
      <div className={`form-group${options ? ' form-group--select' : ''}`} key={name}>
        <label htmlFor={`student-${name}`}>{label}{required && <span aria-hidden="true"> *</span>}</label>
        {options ? (
          <select id={`student-${name}`} name={name} value={formData[name]} onChange={handleChange} required={required}
            className={invalide ? 'is-invalid' : ''} aria-invalid={invalide} aria-describedby={invalide ? `error-${name}` : undefined}>
            {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
          </select>
        ) : (
          <input id={`student-${name}`} name={name} type={type} value={type === 'file' ? undefined : formData[name]} onChange={handleChange}
            placeholder={placeholder} required={required} accept={type === 'file' ? 'image/*' : undefined}
            className={`${type === 'file' ? 'file-input' : ''} ${invalide ? 'is-invalid' : ''}`}
            aria-invalid={invalide} aria-describedby={invalide ? `error-${name}` : undefined} />
        )}
        {erreurs[name] && <p className="error-msg" id={`error-${name}`} role="alert">⚠ {erreurs[name]}</p>}
      </div>
    )
  }

  return (
    <section id="student-form" className="student-form-section">
      <form onSubmit={handleSubmit} className={`student-form${etudiantAModifier ? ' student-form--editing' : ''}${soumis ? ' student-form--invalid' : ''}`} noValidate>
        {etudiantAModifier && <span className="edit-badge">Mode modification</span>}
        <h1>{etudiantAModifier ? "Modifier l'étudiant" : 'Ajouter un étudiant'}</h1>
        <p className="form-intro">Renseignez les informations de l’étudiant ci-dessous.</p>
        <div className="form-grid">
          {champ({ name: 'nom', label: 'Nom', required: true, placeholder: 'Ex. Boubaker' })}
          {champ({ name: 'prenom', label: 'Prénom', required: true, placeholder: 'Ex. Slim' })}
          {champ({ name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'nom@exemple.com' })}
          {champ({ name: 'telephone', label: 'Téléphone', type: 'tel', required: true, placeholder: '+216 00 000 000' })}
          {champ({ name: 'filiere', label: 'Filière', required: true, options: [['', 'Choisir une filière'], ['GLSI', 'GLSI'], ['DSI', 'DSI'], ['RSI', 'RSI']] })}
          {champ({ name: 'anneeEtude', label: "Année d'étude", placeholder: 'Ex. 2ème année' })}
          {champ({ name: 'groupe', label: 'Groupe', placeholder: 'Ex. GLSI 2' })}
          {champ({ name: 'ville', label: 'Ville', placeholder: 'Ex. Sousse' })}
          <div className="form-group form-group--wide">
            {champ({ name: 'image', label: 'Image', type: 'file' })}
            {formData.image && <img className="image-preview" src={formData.image} alt="Aperçu du portrait étudiant" />}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">{etudiantAModifier ? 'Modifier' : 'Ajouter'}</button>
          {etudiantAModifier && <button type="button" className="btn-cancel" onClick={onAnnuler}>Annuler</button>}
        </div>
        {ajoutReussi && <p className="success-msg" role="status">Étudiant ajouté ✓</p>}
      </form>
    </section>
  )
}

export default StudentForm
