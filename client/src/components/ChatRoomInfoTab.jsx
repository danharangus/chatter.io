import "../fonts/VarelaRound-Regular.ttf";
import "../scss/main.scss";
import {AiFillCloseCircle} from "react-icons/ai";
import { useState } from "react";

export default function ChatRoomInfoTab(props) {

    const cl = () => {
        console.log('fasole');
    }
    
    return (
        <div className="chat-info-container">
            <div className="chat-info-container__room-id">{`Room:${props.currentRoom}`}</div>
            <p className="chat-info-container__list-title">Users:</p>
            <div className="chat-info-container__users-container">
                {props.currentUsers.map((currentUserData) => {
                    return (
                        <div className="currentUser">{`-${currentUserData.user}`}</div>
                    );
                })}
            </div>
        </div>
    );
}