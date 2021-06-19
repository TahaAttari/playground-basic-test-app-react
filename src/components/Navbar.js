    import React from 'react'
    import {Link} from 'react-router-dom';
    import './Navbar.css'

    const Navbar = () => {
        return(
            <>
            <h1>FHIR Test</h1>
            <div
            className={'wrapper'}
            >
            <nav>
          <ul>
          <Link to="/patients"><li>Patients</li></Link>
            <Link to="/practitioners"><li>Practitioners</li></Link>
            <Link to="/questionnaire"><li>Questionnaire</li></Link>
          </ul>
        </nav>
        </div>
        </>   
        )
    }
    export default Navbar;