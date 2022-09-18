import "../scss/main.scss";
import lottie from "lottie-web";
import waveBackground from "../lotties/waveBg.json";
import {useEffect} from "react";
import "../fonts/VarelaRound-Regular.ttf";
import Menu from "./Menu";
import ToggleMenuButton from "./ToggleMenuButton";
import dotPatternBg from "../lotties/dot-pattern-background.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function JoinRoomPage() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const joinRoom = (e) => {
        e.preventDefault();
        console.log(room, username);
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
            <form className="join-room-page-container__room-data-form" onSubmit={joinRoom}>
                <input type="text" className="room-data-form__nickname-input" id="nick-input" 
                    placeholder="Nickname..." autoComplete="off"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                <input type="text" className="room-data-form__room-id-input" id="id-input"
                    placeholder="Room Id..." autoComplete="off"
                    onChange={(e) => {
                        setRoom(e.target.value);
                    }}
                />
                <button type="button" value="submit" className="room-data-form__submit-button" onClick={joinRoom}>
                    Join Room
                </button>
            </form>
        </div>
    );
}