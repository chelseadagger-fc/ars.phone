import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import React, { useContext } from "react";
import { StoryContext } from "../../StoryContext";  


interface MessagesProps {
    navigateTo: (newScreen: string) => void;
}



const Messages: React.FC<MessagesProps> = ({ navigateTo }) => {

    const { contactDataSere } = useContext(StoryContext);

    return (
        <div className="h-dvh max-w-full">
            <div className="bg-neutral-400 flex flex-row justify-center items-center h-14" >
                <div className="absolute left-0 top-3 pl-1" onClick={() => navigateTo('HomeScreen')}>
                    <MdArrowBackIosNew size={"2em"}/>
                </div>
                <div className="text-3xl font-bold pb-1">
                    MESSAGES
                </div>
            </div>
            <div>
                <div className="flex flex-row pt-4 px-3" onClick={() => navigateTo('TextingSerenay')}>
                    <IoMdContact size="5em" className="mr-2"/>
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-2xl font-bold">{contactDataSere.name}</p>
                        <p className="text-slate-500">Contact request: an unknown n...</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Messages;