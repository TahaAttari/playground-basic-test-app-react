    import React from 'react'
    import {Link} from 'react-router-dom';
    const Navbar = () => {
        return(
            <nav>
          <h1>
            <Link to="/">Main</Link>
          </h1>
          <ul>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/practitioners">Practitioners</Link></li>
            <li><Link to="/questionnaire">Questionnaire</Link></li>
          </ul>
        </nav>   
        )
    }
    export default Navbar;