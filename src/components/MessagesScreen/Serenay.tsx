import { MdArrowBackIosNew } from "react-icons/md";
import React, { useEffect, useState } from "react";
import './Messages.css';
import chatData from '../StoryData/Ch01.json'

interface MessagesProps {
    navigateTo: (newScreen: string) => void;
    msgSereData: { name: string };
    setMsgSereData: (name: (prevState: { name: string }) => { name: string }) => void;
    displayedMessages: JSX.Element[];
    setDisplayedMessages: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

type Message = {
    id: number;
    type: "message";
    content: string;
    delay: number;
    alignment: "left" | "right" | "center";
    next: number | null;
    flag?: string;
};

type ChoiceOption = {
    text: string;
    delay: number;
    alignment: "left" | "right" | "center";
};

type Choice = {
    id: number;
    type: "choice";
    content?: {
        text: string;
        delay: number;
        alignment: "left" | "right" | "center";
    };
    choices: { option: ChoiceOption; next: number }[];
    next: number | null;
    flag?: string;
};

type StoryElement = Message | Choice;

const storyData: StoryElement[] = chatData as StoryElement[];

const Serenay: React.FC<MessagesProps> = ({ navigateTo, displayedMessages, setDisplayedMessages, msgSereData, setMsgSereData }) => {

    const [currentId, setCurrentId] = useState<number | null>(null);
    const [showChoices, setShowChoices] = useState<boolean>(false);
    const [choices, setChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
    const [showStartButton, setShowStartButton] = useState<boolean>(true);

    useEffect(() => {
        if (currentId === null) return;

        const currentElement = storyData.find(element => element.id === currentId);

        if (!currentElement) return;

        if (currentElement.flag === 'updateSereNameToSerenay') {
            setMsgSereData((prevState: { name: string }) => ({ ...prevState, name: "Serenay" }));
        }

        if (currentElement.type === 'message') {
            const newMessage = (
                <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
                    {currentElement.content}
                </p>
            );
            setDisplayedMessages(prevMessages => [...prevMessages, newMessage]);

            setTimeout(() => {
                setCurrentId(currentElement.next);
            }, currentElement.delay);
        } else if (currentElement.type === 'choice') {
            if (currentElement.content) {
                const choiceContent = (
                    <p key={`choice-content-${currentElement.id}`} className={`message ${currentElement.content.alignment}`}>
                        {currentElement.content.text}
                    </p>
                );
                setDisplayedMessages(prevMessages => [...prevMessages, choiceContent]);

                setTimeout(() => {
                    setChoices(currentElement.choices);
                    setShowChoices(true);
                }, currentElement.content.delay);
            } else {
                setChoices(currentElement.choices);
                setShowChoices(true);
            }
        }
    }, [currentId, setMsgSereData]);

    const handleChoice = (next: number, option: ChoiceOption) => {
        setShowChoices(false);
        const choiceMessage = (
            <p key={`choice-${next}`} className={`message ${option.alignment}`}>
                {option.text}
            </p>
        );
        setDisplayedMessages(prevMessages => [...prevMessages, choiceMessage]);

        setTimeout(() => {
            setCurrentId(next);
        }, option.delay);
    };

    const startStory = () => {
        setCurrentId(1);
        setDisplayedMessages([]);
        setShowStartButton(false);
    };

 
    return (
        <div className="h-dvh flex flex-col justify-between bg-neutral-800">
            <div className="absolute w-full bg-neutral-700 flex flex-row justify-center items-center h-[8%]" >
                <div className="absolute left-0 top-3 pl-1" onClick={() => navigateTo('Messages')}>
                    <MdArrowBackIosNew size={"2em"} color="white" />
                </div>
                <div className="text-2xl font-bold pb-1 text-white">
                    <p>{msgSereData.name}</p>
                </div>
            </div>
            <div className="h-[82%] flex flex-col justify-end mt-12 text-left text-white overflow-y-auto">
                {displayedMessages}
            </div>
            <div className="bg-neutral-600 h-[10%] flex flex-row justify-center items-center rounded-xl mx-3 my-2">
                {showStartButton && <button onClick={startStory}>Start Story</button>}
                {showChoices && (
                    <div>
                        {choices.map((choice, index) => (
                            <button className="bg-neutral-700 rounded-lg text-white text-lg mx-3 my-1 px-5 py-2 w-72" key={index} onClick={() => handleChoice(choice.next, choice.option)}>
                                {choice.option.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Serenay;