import "../scss/main.scss";
import lottie from "lottie-web";
import waveBackground from "../lotties/waveBg.json";
import {useEffect} from "react";
import "../fonts/VarelaRound-Regular.ttf";
import Menu from "./Menu";
import ToggleMenuButton from "./ToggleMenuButton";
import dotPatternBg from "../lotties/dot-pattern-background.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom"

export default function JoinRoomPage() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            const joinData = {
                username: username,
                room: room
            }
            navigate(`/chat/${username}/${room}`);
        }
    }

    const chooseBackground = () => {
        if (window.innerWidth < 800) {
            return dotPatternBg;
        } else if (window.innerWidth >= 800) {
            return waveBackground;
        }
    }

    useEffect(() => {
        console.log("hello");
        const backgroundAnim = lottie.loadAnimation({
            container: document.querySelector('.join-room-page-container__animation-container'),
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
        <div className="join-room-page-container">
            <Menu currentPage="join-room"/>
            <ToggleMenuButton/>
            <div className="join-room-page-container__animation-container"></div>
        </div>
    );
}