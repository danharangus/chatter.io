import "../scss/main.scss";


export default function Message(props) {
    return (
        <div className={`message-data ${props.authorSocketId === props.userSocketId ? "message--you" : ""}`}>
            <p className="message-data__body">{props.messageText}</p>
            <div className="message-data__meta">
                <p className="meta__author">{props.author}@</p>
                <p className="meta__date">{props.date}</p>
            </div>
        </div>
    );
}