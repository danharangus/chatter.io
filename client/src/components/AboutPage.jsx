import "../scss/main.scss";
import welcomeLogo from "../assets/logoUpscaledTransparent.png";
import Menu from "./Menu";
import ToggleMenuButton from "./ToggleMenuButton";

export default function AboutPage() {
    return (
        <div className="about-page-container">
                <Menu currentPage="about"/>
                <ToggleMenuButton/>
                <div className="about-page-container__description-container">
                    <img src={welcomeLogo} alt="logo" className="description-container__welcome-logo"/>
                    <p className="description-container__text">Chatter.io was created to provide an easy to use, lightweight, anonymous chatting platform to its users. Whether you want to have a private conversation on a platform where messages disappear as soon as you leave the chat, or you want to quickly and easily set up a group chat, Chatter.io is here for you. Just enter a room ID, and you are good to go!</p>
                </div>
        </div>
    );
}