
interface MessagesProps {
    onAppPress: (newScreen: string) => void;
}

const Messages: React.FC<MessagesProps> = ({ onAppPress }) => {
    return (
        <div className="h-dvh">
            <p>MESSAGES</p>
            <p onClick={() => onAppPress('home')}>Back button</p>
        </div>
    );
};

export default Messages;