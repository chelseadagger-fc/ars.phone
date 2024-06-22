import { MdArrowBackIosNew } from "react-icons/md";
import React, { useContext } from "react";
import './Messages.css';
import { StoryContext } from '../../StoryContext';

interface MessagesProps {
    navigateTo: (newScreen: string) => void;
}

const Serenay: React.FC<MessagesProps> = ({ navigateTo }) => {

    const { startStory, handleChoice, choices, showChoices, showStartButton, setShowStartButton, story, contactDataSere, displayedMessages, setCurrentId } = useContext(StoryContext);
 
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
            <div className="h-[82%] w-full flex flex-col justify-end mt-12 text-left text-white overflow-y-auto">
                {displayedMessages}
            </div>
            <div className="bg-neutral-600 h-[10%] flex flex-row justify-center items-center rounded-xl mx-3 my-2">
                {showStartButton && <button onClick={startStory}>Start Story</button>}
                {showChoices && choices.map((choice, index) => (
                    <button
                    className="bg-neutral-600/75 rounded-lg text-white text-lg mx-3 my-1 px-5 py-2 w-72"
                    key={index}
                    onClick={() => handleChoice(choice.next, choice.option)}
                    >
                        {choice.option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Serenay;