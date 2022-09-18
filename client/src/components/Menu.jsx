import {Link} from "react-router-dom";
import "../scss/main.scss";


export default function Menu(props) {

    return (
        <div className="menu-container">
            <Link to="/"
                  className={props.currentPage === 'home' ? 'menu-container__menu-button menu-button--active' : 'menu-container__menu-button'}>Home</Link>
            <Link to="/about"
                  className={props.currentPage === 'about' ? 'menu-container__menu-button menu-button--active' : 'menu-container__menu-button'}>About</Link>
        </div>
    );
}