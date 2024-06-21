import { MdArrowBackIosNew } from "react-icons/md";
import React, { useContext, useEffect } from "react";
import './Messages.css';
import { StoryContext } from '../../StoryContext';

interface MessagesProps {
    navigateTo: (newScreen: string) => void;
    contactDataSere: { name: string };
    setContactDataSere: (name: (prevState: { name: string }) => { name: string }) => void;
}

const Serenay: React.FC<MessagesProps> = ({ navigateTo, contactDataSere, setContactDataSere }) => {

    const { story, displayedMessages, setDisplayedMessages } = useContext(StoryContext);
    const { currentId, setCurrentId, showChoices, setShowChoices, choices, setChoices, showStartButton, setShowStartButton, handleChoice } = useContext(StoryContext);

    useEffect(() => {
        if (currentId === null) return;

        const currentElement = story.find((element: { id: number; }) => element.id === currentId);

        if (!currentElement) return;

        if (currentElement.flag === 'updateSereNameToSerenay') {
            setContactDataSere((prevState: { name: string }) => ({ ...prevState, name: "Serenay" }));
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
    }, [currentId, setChoices, setCurrentId, setDisplayedMessages, setContactDataSere, setShowChoices, story]);

    // const handleChoice = (next: number, option: { text: string; delay: number; alignment: "left" | "right" | "center"; }) => {
    //     setShowChoices(false);
    //     const choiceMessage = (
    //         <p key={`choice-${next}`} className={`message ${option.alignment}`}>
    //             {option.text}
    //         </p>
    //     );
    //     setDisplayedMessages(prevMessages => [...prevMessages, choiceMessage]);

    //     setTimeout(() => {
    //         setCurrentId(next);
    //     }, option.delay);
    // };

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
                    <p>{contactDataSere.name}</p>
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