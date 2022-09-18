import { useState } from "react";
import "../scss/main.scss";
import {AiOutlineSend} from "react-icons/ai";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {useLocation} from 'react-router-dom';   
import io from "socket.io-client";
import ChatRoomInfoTab from "./ChatRoomInfoTab";
import {BsFillInfoSquareFill} from "react-icons/bs";
import {CgDetailsMore} from "react-icons/cg";
import {GiCardExchange} from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function ChatPage(props) {

    const [message, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [socketId, setSocketId] = useState("");
    const [activeUsers, setActiveUsers] = useState([]);
    const [infoTabStatus,setInfoTabStatus] = useState('closed');
    const { user, room } = useParams();

    const socket = props.socket;

    const changeRoomButtonClick = () => {
        if(window.location.protocol === 'http:'){
            window.location = `http://${window.location.host}/join-room`;
        }else if(window.location.protocol === 'https:'){
            window.location = `https://${window.location.host}/join-room`;
        }
    }

    const autoScrollToBottom = () => {
        const element = document.querySelector(".chat-page-container__messages-container");
        element.scrollTop = element.scrollHeight;
    }

    const autoScrollToBottomWhole = () => {
        const wholePage = document.querySelector(".chat-page-container");
        wholePage.scrollTop = wholePage.scrollHeight;
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message !== "") {
            const messageInfo = {
                author: user,
                message: message,
                room: room,
                socketId: socketId,
                date: `${new Date().getHours()}:${new Date().getMinutes() <= 9 ? `0${new Date().getMinutes()}`: new Date().getMinutes()}`
            };
            await socket.emit("send-message", messageInfo);
            setMessageList((messageList) => [...messageList, messageInfo]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        autoScrollToBottom();
        autoScrollToBottomWhole();
    })

    useEffect(() => {
        const data = {
            user: user,
            room: room
        };
        socket.emit("join-room", data);
        setSocketId(socket.id);
        return () => socket.emit('end');
    }, []);

    useEffect(() => {
        socket.off("receive-message").on("receive-message", (data) => {
          setMessageList((messageList) => [...messageList, data]);
          autoScrollToBottom();
        });
      }, []);

      useEffect(() => {
        socket.off("user-joined").on("user-joined", (activeUsers) => {
            setActiveUsers(activeUsers);
        });
      }, []);

      useEffect(() => {
        socket.off("user-left").on("user-left", (activeUsers) => {
            setActiveUsers(activeUsers);
        });
      }, []);

      useEffect(() => {
        socket.off("first-connected").on("first-connected", (activeUsers) => {
            setActiveUsers(activeUsers);
        });
      }, []);

    const changeInput = (e) => {
        setCurrentMessage(e.target.value);
    }

    const toggleMoreInfoButtonClick = () => {
        let infoTabElement = document.querySelector('.chat-info-container');
        if (infoTabStatus === 'closed') {
            let widthPercentage;

            if (window.innerWidth < 800) {
                widthPercentage = "50%";
            } else if (window.innerWidth >= 800) {
                widthPercentage = "25%";
            }

            infoTabElement.style.setProperty('--infoContainerWidth', widthPercentage);
            infoTabElement.style.setProperty('--infoContainerOpacity', '1');
            setInfoTabStatus('opened');
            
        } else {
            infoTabElement.style.setProperty('--infoContainerWidth', "0%");
            infoTabElement.style.setProperty('--infoContainerOpacity', "0");
            setInfoTabStatus('closed');
        }
    }

    return (
        <div className="chat-page-container">
            <ChatRoomInfoTab currentUsers={activeUsers} currentRoom={room}/>
            <div className="chat-page-container__room-controls">
                <button className="room-controls__info-button" onClick={toggleMoreInfoButtonClick}>
                    <CgDetailsMore/>
                </button>
                <button className="room-controls__change-room-button" onClick={changeRoomButtonClick}>
                    <GiCardExchange/>
                </button>
            </div>
            <div className="chat-page-container__messages-container">
                {messageList.map((messageContent) => {
                    return (
                        <Message author={messageContent.author} userSocketId={socketId} authorSocketId={messageContent.socketId} user={user} date={messageContent.date} messageText={messageContent.message}/>
                    );
                })}
            </div>
            <form className="chat-page-container__message-form" onSubmit={sendMessage}>
                <input type="textarea" className="message-form__input" id="msg-input" 
                    placeholder="Send a message..." onChange={changeInput} value={message} autoComplete="off"/>
                <button type="button" value="Submit" className="message-form__send-button" onClick={sendMessage}>
                    <AiOutlineSend/>
                </button>
            </form>
        </div>
    );
}