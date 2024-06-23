import { MdArrowBackIosNew } from "react-icons/md";
import React, { useContext } from "react";
import './Messages.css';
import { StoryContext } from '../../StoryContext';
import { FaVideo  } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
import { MdPhone } from "react-icons/md";

interface MessagesProps {
    navigateTo: (newScreen: string) => void;
}

const Kaede: React.FC<MessagesProps> = ({ navigateTo }) => {

    const { kaedeMessages, startStory, handleChoice, choices, showChoices, showStartButton, setShowStartButton, story, contactDataKaede, displayedMessages, setCurrentId } = useContext(StoryContext);
 
    return (
        <div className="h-dvh max-w-full flex flex-col justify-between bg-neutral-800">
            <div className="w-full max-w-xl bg-neutral-700 flex flex-row justify-between items-center h-[8%]" >
                <div className="flex flex-row text-white items-center">
                    <div className="left-0 top-3 pl-1" onClick={() => navigateTo('Messages')}>
                        <MdArrowBackIosNew size={"2em"} color="white" className="mr-4 ml-1" />
                    </div>
                    <img className="h-12 mr-3 rounded-lg" src={`/images/contacts/${contactDataKaede.profileImg}`} />
                    <p className="text-2xl font-semibold mb-1">{contactDataKaede.name}</p>
                </div>
                <div className="flex flex-row pb-1 items-center text-2xl">
                    <FaVideo size={".95em"} color="white" className="mr-4" />
                    <MdPhone size={"1em"} color="white" className="mr-3" />
                    <TbDotsVertical size={"1em"} color="white" className="mr-2" />
                </div>
            </div>
            <div className="h-[82%] w-full flex flex-col justify-end text-left text-white overflow-y-auto">
                {kaedeMessages}
            </div>
            <div className="bg-neutral-600 h-[10%] flex flex-row justify-center items-center rounded-xl mx-3 my-2">
                {showStartButton && <button onClick={startStory}>Start Story</button>}
                {showChoices && choices.map((choice, index) => (
                    <button
                    className="bg-neutral-600 rounded-lg w-full text-white text-lg mx-3 my-1 px-5 py-2 w-72"
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

export default Kaede;