import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import React, { useContext } from "react";
import { StoryContext } from "../../StoryContext";  


interface MessagesProps {
    navigateTo: (newScreen: string) => void;
}



const Messages: React.FC<MessagesProps> = ({ navigateTo }) => {

    const { contactDataSere, contactDataKaede, contactDataWillian, contactDataIshtar } = useContext(StoryContext);


    return (
        <div className="h-dvh max-w-full">
            <div className="bg-neutral-700 flex flex-row justify-left items-center h-[8%]" >
                <div className="left-0 top-3 pl-1" onClick={() => navigateTo('HomeScreen')}>
                            <MdArrowBackIosNew size={"2em"} color="white" className="mr-4 ml-1" />
                </div>
                <div className="text-3xl text-white pb-1 font-quicksand font-medium">
                    MESSAGES
                </div>
            </div>
            <div className="bg-neutral-800 h-[92%] font-noto">
                <div className="flex flex-row pt-4 px-3" onClick={() => navigateTo('TextingSerenay')}>
                    <img className="w-20 mr-4 rounded-full" src={`/images/contacts/${contactDataSere.profileImg}`} />
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-2xl font-medium font-titillium text-white">{contactDataSere.name}</p>
                        <p className="text-slate-500 text-left">
                            {contactDataSere.latestMessage.length > 35
                            ? `${contactDataSere.latestMessage.slice(0, 35)}...`
                            : contactDataSere.latestMessage}
                        </p>
                    </div>
                </div>
                {contactDataKaede.discovered && (
                    <div className="flex flex-row pt-4 px-3" onClick={() => navigateTo('TextingKaede')}>
                        <img className="w-20 mr-4 rounded-full" src={`/images/contacts/${contactDataKaede.profileImg}`} />
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-2xl font-medium font-titillium text-white">{contactDataKaede.name}</p>
                            <p className="text-slate-500 text-left">
                                {contactDataKaede.latestMessage.length > 35
                                    ? `${contactDataKaede.latestMessage.slice(0, 35)}...`
                                    : contactDataKaede.latestMessage}
                            </p>    
                        </div>
                    </div>
                )}
                {contactDataWillian.discovered && (
                <div className="flex flex-row pt-4 px-3" onClick={() => navigateTo('TextingWillian')}>
                    <img className="w-20 mr-4 rounded-full" src={`/images/contacts/${contactDataWillian.profileImg}`} />
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-2xl font-medium font-titillium text-white">{contactDataWillian.name}</p>
                        <p className="text-slate-500 text-left">
                        {contactDataWillian.latestMessage.length > 35
                            ? `${contactDataWillian.latestMessage.slice(0, 35)}...`
                            : contactDataWillian.latestMessage}
                        </p>
                    </div>
                </div>
                )}
                {contactDataIshtar.discovered && (
                <div className="flex flex-row pt-4 px-3" onClick={() => navigateTo('TextingIshtar')}>
                    <img className="w-20 mr-4 rounded-full" src={`/images/contacts/${contactDataIshtar.profileImg}`} />
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-2xl font-medium font-titillium text-white">{contactDataIshtar.name}</p>
                        <p className="text-slate-500 text-left">
                                {contactDataIshtar.latestMessage.length > 35
                                    ? `${contactDataIshtar.latestMessage.slice(0, 35)}...`
                                    : contactDataIshtar.latestMessage}
                            </p>    
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Messages;