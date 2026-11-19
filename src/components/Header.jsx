import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-brand">
        <span className="university-monogram" aria-hidden="true">UM</span>
        <div>
          <p className="university-name">Université Mahdia</p>
          <h1>Portail de Gestion Étudiante</h1>
        </div>
      </div>
    </header>
  )
}

export default Header
