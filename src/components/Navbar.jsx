import './Navbar.css'

function Navbar() {
  return (
    <nav className="site-navbar" aria-label="Navigation principale">
      <a href="#top" className="active">Accueil</a>
      <a href="#students-title">Étudiants</a>
      <a href="mailto:contact@universite.tn">Contact</a>
    </nav>
  )
}

export default Navbar
