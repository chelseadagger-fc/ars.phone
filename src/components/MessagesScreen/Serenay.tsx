import { MdArrowBackIosNew } from "react-icons/md";
import React, { useContext } from "react";
import './Messages.css';
import { StoryContext } from '../../StoryContext';

interface MessagesProps {
    navigateTo: (newScreen: string) => void;
}

const Serenay: React.FC<MessagesProps> = ({ navigateTo }) => {

    const { story, contactDataSere, displayedMessages, addMessageInSequence } = useContext(StoryContext);
 
    return (
        <div className="h-dvh max-w-full flex flex-col justify-between bg-neutral-800">
            <div className="absolute w-full max-w-xl bg-neutral-700 flex flex-row justify-center items-center h-[8%]" >
                <div className="absolute left-0 top-3 pl-1" onClick={() => navigateTo('Messages')}>
                    <MdArrowBackIosNew size={"2em"} color="white" />
                </div>
                <div className="text-2xl font-bold pb-1 text-white">
                    <p>{contactDataSere.name}</p>
                </div>
            </div>
            <div className="h-[82%] flex flex-col justify-end mt-12 text-left text-white overflow-y-auto">
                {displayedMessages.map((message, index) => (
                    <div key={index} className="message">{message}</div>
                ))}
            </div>
            <div className="bg-neutral-600 h-[10%] flex flex-row justify-center items-center rounded-xl mx-3 my-2" onClick={addMessageInSequence}>
                <button onClick={addMessageInSequence}>Show Next Message</button>
            </div>
        </div>
    );
};

export default Serenay;