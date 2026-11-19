import './StudentCard.css'
import { useState } from 'react'

function StudentCard(props) {
  // Props supply all student data; ville falls back when no value is provided.
  const ville = props.ville || 'Non renseignée'
  const [infosVisibles, setInfosVisibles] = useState(false)

  function basculerInfos() {
    setInfosVisibles((visible) => !visible)
  }

  return (
    <article className="student-card">
      <div className="student-card__top">
        <img
          className="student-card__photo"
          src={props.image}
          alt={`Portrait de ${props.prenom} ${props.nom}`}
        />
        <h2>Fiche étudiant</h2>
      </div>

      <dl className="student-details">
        <div><dt>Nom &amp; Prénom</dt><dd>{props.prenom} {props.nom}</dd></div>
        {infosVisibles &&(
          <>
          <div><dt>Email</dt><dd>{props.email}</dd></div>
         <div><dt>Téléphone</dt><dd>{props.telephone}</dd></div>
         </>
        )}
        <div><dt>Filière</dt><dd>{props.filiere}</dd></div>
        <div><dt>Année</dt><dd>{props.anneeEtude}</dd></div>
        <div><dt>Groupe</dt><dd>{props.groupe}</dd></div>
        <div><dt>Ville</dt><dd>{ville}</dd></div>
      </dl>

      <a className="contact-button" href={`mailto:${props.email}`}>
        Contacter
      </a>
      <div className="student-card__actions">
        <button className="toggle-infos-button" onClick={basculerInfos}>
        afficher / masquer 
      </button>
        <button className="update-button" type="button" onClick={props.onUpdate}>
          Modifier
        </button>
        <button className="delete-button" type="button" onClick={props.onDelete}>
          Supprimer
        </button>
      </div>
    </article>
  )
}

export default StudentCard
