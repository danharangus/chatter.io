import "../scss/main.scss";
import Menu from "./Menu";
import ToggleMenuButton from "./ToggleMenuButton";

export default function Page404() {

    return (
        <div className="page404-container">
            <Menu currentPage='none'/>
            <ToggleMenuButton/>
            <div className="page404-container__error-information-container">
                <h1>Error 404</h1>
                <h2>Page not found</h2>
            </div>
        </div>
    );
}