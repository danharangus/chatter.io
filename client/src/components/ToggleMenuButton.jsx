import {useEffect} from "react";
import lottie from 'lottie-web';
import buttonAnimSrc from "../lotties/7450-menu.json";
import {useState} from "react";
import "../scss/main.scss";

export default function ToggleMenuButton() {

    const [menuStatus, setMenuStatus] = useState('closed');
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const toggleMenuButtonClick = () => {
        let menuContainerElement = document.querySelector('.menu-container');
        if (menuStatus === 'closed') {
            let widthPercentage;

            if (window.innerWidth < 800) {
                widthPercentage = "50%";
            } else if (window.innerWidth >= 800) {
                widthPercentage = "25%";
            }

            menuContainerElement.style.setProperty('--menuWidth', widthPercentage);
            menuContainerElement.style.setProperty('--menuOpacity', '1');
            setMenuStatus('opened');
            
        } else {
            menuContainerElement.style.setProperty('--menuWidth', "0%");
            menuContainerElement.style.setProperty('--menuOpacity', "0");
            setMenuStatus('closed');
        }
    }

    useEffect(() => {
        const buttonAnim = lottie.loadAnimation({
            container: document.querySelector('.toggle-button-container'),
            animationData: buttonAnimSrc,
            renderer: 'svg',
            loop: false,
            autoplay: false
        });
        if (isFirstLoad === false) {
            buttonAnim.goToAndPlay(0);
        } else {
            setIsFirstLoad(false);
        }
        return () => {
            buttonAnim.destroy();
        }
    }, [menuStatus]);

    return (
        <div className="toggle-button-container" onClick={toggleMenuButtonClick}></div>
    );

}