import "../scss/main.scss";
import lottie from "lottie-web";
import waveBackground from "../lotties/waveBg.json";
import {useEffect} from "react";
import "../fonts/VarelaRound-Regular.ttf";
import Menu from "./Menu";
import ToggleMenuButton from "./ToggleMenuButton";
import dotPatternBg from "../lotties/dot-pattern-background.json";
import io from "socket.io-client";
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
            <Menu currentPage="Join Room"/>
            {/*<div className="home-page-container__animation-container"></div>*/}
            <input 
                type="text" 
                placeholder="Name..." 
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <input 
                type="text" 
                placeholder="Room ID..."
                onChange={(event) => {
                    setRoom(event.target.value);
                }}    
            />
            <button onClick={joinRoom}>Join room</button>
        </div>
    );
}