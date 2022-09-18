import lottie from 'lottie-web';
import loaderSrc from '../lotties/98288-loading.json';
import {useEffect} from 'react';
import '../scss/main.scss';


export default function Loader() {

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: document.querySelector('.loader-page-container__loader-container'),
            animationData: loaderSrc,
            renderer: 'svg',
            loop: true,
            autoplay: true
        })

        return () => {
            anim.destroy();
        }
    }, []);

    return (
        <div className="loader-page-container">
            <div className="loader-page-container__loader-container"></div>
        </div>
    );
}
