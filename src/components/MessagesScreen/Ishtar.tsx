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

const Ishtar: React.FC<MessagesProps> = ({ navigateTo }) => {

    const { showIshtarChoices, ishtarChoices, startStory, handleChoice, choices, showChoices, showStartButton, setShowStartButton, story, contactDataIshtar, ishtarMessages, setCurrentId } = useContext(StoryContext);
 
    return (
        <div className="h-dvh max-w-full flex flex-col justify-between bg-neutral-800">
            <div className="absolute w-full max-w-xl bg-neutral-700 flex flex-row justify-between items-center h-[8%]" >
                <div className="flex flex-row text-white items-center font-quicksand">
                    <div className="left-0 top-3 pl-1" onClick={() => navigateTo('Messages')}>
                        <MdArrowBackIosNew size={"2em"} color="white" className="mr-4 ml-1" />
                    </div>
                    <img className="h-12 mr-3 rounded-lg" src={`/images/contacts/${contactDataIshtar.profileImg}`} />
                    <p className="text-2xl font-semibold mb-1">{contactDataIshtar.name}</p>
                </div>
                <div className="flex flex-row pb-1 items-center text-2xl">
                    <FaVideo size={".95em"} color="white" className="mr-4" />
                    <MdPhone size={"1em"} color="white" className="mr-3" />
                    <TbDotsVertical size={"1em"} color="white" className="mr-2" />
                </div>
            </div>
            <div className="h-full w-full flex flex-col justify-end text-left text-white overflow-y-auto font-noto">
                {ishtarMessages}
            </div>
            <div className="bg-neutral-600 h-[10%] flex flex-row justify-center items-center rounded-xl mx-3 my-2">
                {showIshtarChoices && ishtarChoices.map((choice, index) => (
                    <button
                    className={`bg-stone-500/80 rounded-lg w-11/12 text-white border-solid border-1 font-noto border-black ${ishtarChoices.length === 1 ? 'text-lg py-2' : ishtarChoices.length === 2 ? 'text-md my-1 py-1' : 'text-sm mt-1'}`}
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

export default Ishtar;