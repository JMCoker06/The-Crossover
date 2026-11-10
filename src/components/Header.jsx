import { NavLink, Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="site-header">
            <div className="container header-inner">
                <Link to="/" className="brand">
                    The <span>Crossover</span>
                </Link>
                <nav className="nav">
                    <NavLink to="/" end>
                        Feed
                    </NavLink>
                    <NavLink to="/new" className="btn btn-primary">
                        + New post 
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}