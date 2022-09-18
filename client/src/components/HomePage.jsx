import "../scss/main.scss";
import lottie from "lottie-web";
import waveBackground from "../lotties/waveBg.json";
import {useEffect} from "react";
import "../fonts/VarelaRound-Regular.ttf";
import Menu from "./Menu";
import ToggleMenuButton from "./ToggleMenuButton";
import dotPatternBg from "../lotties/dot-pattern-background.json";
import welcomeLogo from "../assets/logoUpscaledTransparent.png";

export default function HomePage() {

    const chooseBackground = () => {
        if (window.innerWidth < 800) {
            return dotPatternBg;
        } else if (window.innerWidth >= 800) {
            return waveBackground;
        }
    }

    useEffect(() => {
        const backgroundAnim = lottie.loadAnimation({
            container: document.querySelector('.home-page-container__animation-container'),
            animationData: chooseBackground(),
            renderer: 'svg',
            loop: true,
            autoplay: true
        });

        return () => {
            backgroundAnim.destroy();
        }
    },[]);

    return (
        <div className="home-page-container">
            <Menu currentPage="home"/>
            <ToggleMenuButton/>
            <div className="home-page-container__animation-container"></div>
            <img src={welcomeLogo} alt="logo" className="home-page-container__welcome-logo"/>
        </div>
    );
}