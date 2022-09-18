import { useState } from "react";
import "../scss/main.scss";
import {AiOutlineSend} from "react-icons/ai";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {useLocation} from 'react-router-dom';   
import io from "socket.io-client";

export default function ChatPage(props) {

    const [message, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const { user, room } = useParams();

    const socket = props.socket;

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message !== "") {
            const messageInfo = {
                author: user,
                message: message,
                room: room,
                date: `${new Date().getHours()}:${new Date().getMinutes() <= 9 ? `0${new Date().getMinutes()}`: new Date().getMinutes()}`
            };
            await socket.emit("send-message", messageInfo);
            setMessageList((messageList) => [...messageList, messageInfo]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        console.log(room);
        socket.emit("join-room", room);

        return () => socket.emit('end');
    }, []);

    useEffect(() => {
        socket.off("receive-message").on("receive-message", (data) => {
          setMessageList((messageList) => [...messageList, data]);
        });
      }, []);

    const changeInput = (e) => {
        setCurrentMessage(e.target.value);
    }

    return (
        <div className="chat-page-container">
            <div className="chat-page-container__room-controls">
                here go room controls
            </div>
            <div className="chat-page-container__messages-container">
                {messageList.map((messageContent) => {
                    return (
                        <Message author={messageContent.author} user={user} date={messageContent.date} messageText={messageContent.message}/>
                    );
                })}
            </div>
            <form className="chat-page-container__message-form" onSubmit={sendMessage}>
                <input type="textarea" className="message-form__input" id="msg-input" 
                    placeholder="Send a message..." onChange={changeInput} value={message}autoComplete="false"/>
                <button type="button" value="Submit" className="message-form__send-button" onClick={sendMessage}>
                    <AiOutlineSend/>
                </button>
            </form>
        </div>
    );
}