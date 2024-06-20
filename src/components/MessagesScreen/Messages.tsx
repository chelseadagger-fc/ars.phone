import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import React from "react";

interface MessagesProps {
    onAppPress: (newScreen: string) => void;
    sereName: string;
}

interface MessagesTypes {
    name: string;
}

const Messages: React.FC<MessagesProps> = ({ onAppPress, sereName }) => {

    return (
        <div className="h-dvh">
            <div className="bg-neutral-400 flex flex-row justify-center items-center h-14" >
                <div className="absolute left-0 top-3 pl-1" onClick={() => onAppPress('home')}>
                    <MdArrowBackIosNew size={"2em"}/>
                </div>
                <div className="text-3xl font-bold pb-1">
                    MESSAGES
                </div>
            </div>
            <div>
                <div className="flex flex-row pt-4 px-3" onClick={() => onAppPress('sere')}>
                    <IoMdContact size="5em" className="mr-2"/>
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-2xl font-bold">{sereName}</p>
                        <p className="text-slate-500">Did you get your phone fi . . .</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Messages;