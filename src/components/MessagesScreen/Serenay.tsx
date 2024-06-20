import { MdArrowBackIosNew } from "react-icons/md";
import React from "react";

interface MessagesProps {
    onAppPress: (newScreen: string) => void;
    sereName: string;
}

const Serenay: React.FC<MessagesProps> = ({ onAppPress, sereName }) => {

    return (
        <div className="h-dvh">
            <div className="bg-neutral-400 flex flex-row justify-center items-center h-14" >
                <div className="absolute left-0 top-3 pl-1" onClick={() => onAppPress('messages')}>
                    <MdArrowBackIosNew size={"2em"}/>
                </div>
                <div className="text-3xl font-bold pb-1">
                    {sereName}
                </div>
            </div>
            <div>
                <div className="flex flex-row pt-4 px-3">
                </div>
            </div>
        </div>
    );
};

export default Serenay;