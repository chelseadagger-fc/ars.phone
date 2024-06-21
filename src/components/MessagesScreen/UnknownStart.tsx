import { MdArrowBackIosNew } from "react-icons/md";
import React, { useEffect, useState } from "react";
import './UnknownStart.css';

interface MessagesProps {
    onAppPress: (newScreen: string) => void;
    sereName: string;
}

type Message = {
    id: number;
    type: "message";
    content: string;
    delay: number;
    alignment: "left" | "right" | "center";
    next: number | null;
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
};

type StoryElement = Message | Choice;

const storyData: StoryElement[] = [
    { "id": 1, "type": "message", "content": "Heyyy", "delay": 1600, "alignment": "left", "next": 2 },
    { "id": 2, "type": "message", "content": "So", "delay": 1200, "alignment": "left", "next": 3 },
    {
        "id": 3,
        "type": "choice",
        "content": {
            "text": "I guess you got your phone fixed then?",
            "delay": 1000,
            "alignment": "left"
        },
        "choices": [
            { "option": { "text": "Sort of", "delay": 1500, "alignment": "right" }, "next": 4 }
        ],
        "next": null
    },
    {
        "id": 4,
        "type": "choice",
        "content": {
            "text": "Sort of?",
            "delay": 1000,
            "alignment": "left"
        },
        "choices": [
            { "option": { "text": "Yeahhhhh", "delay": 0, "alignment": "right" }, "next": 5 }
        ],
        "next": null
    },
    {
        "id": 5,
        "type": "choice",
        "choices": [
            { "option": { "text": "Sooooo", "delay": 0, "alignment": "right" }, "next": 6 },
        ],
        "next": null
    },
    {
        "id": 6,
        "type": "choice",
        "choices": [
            { "option": { "text": "Who is this anyway?", "delay": 1500, "alignment": "right" }, "next": 7 },
        ],
        "next": null
    },
    { "id": 7, "type": "message", "content": "?", "delay": 1800, "alignment": "left", "next": 8 },
    { "id": 8, "type": "message", "content": "Wait...", "delay": 1400, "alignment": "left", "next": 9 },
    { "id": 9, "type": "message", "content": "Please don't tell me", "delay": 600, "alignment": "left", "next": 10 },
    { "id": 10, "type": "message", "content": "You lost all your contacts", "delay": 600, "alignment": "left", "next": 11 },
    { "id": 11, "type": "message", "content": "After I reminded you", "delay": 600, "alignment": "left", "next": 12 },
    { "id": 12, "type": "message", "content": "To back them up", "delay": 600, "alignment": "left", "next": null },
];

const UnknownStart: React.FC<MessagesProps> = ({ onAppPress }) => {

    const [currentId, setCurrentId] = useState<number | null>(null);
    const [showChoices, setShowChoices] = useState<boolean>(false);
    const [choices, setChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
    const [displayedMessages, setDisplayedMessages] = useState<JSX.Element[]>([]);
    const [showStartButton, setShowStartButton] = useState<boolean>(true);

    useEffect(() => {
        if (currentId === null) return;

        const currentElement = storyData.find(element => element.id === currentId);

        if (!currentElement) return;

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
    }, [currentId]);

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
                <div className="absolute left-0 top-3 pl-1" onClick={() => onAppPress('messages')}>
                    <MdArrowBackIosNew size={"2em"} color="white" />
                </div>
                <div className="text-2xl font-bold pb-1 text-white">
                    Unknown
                </div>
            </div>
            <div className="h-[77%] flex flex-col justify-end mt-12 text-white overflow-y-auto">
                {displayedMessages}
            </div>
            <div className="bg-neutral-600 h-[15%] flex flex-row justify-center items-center rounded-xl mx-3 my-2">
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

export default UnknownStart;