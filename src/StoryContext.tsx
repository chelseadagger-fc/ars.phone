import { createContext, useState, useEffect, ReactNode } from 'react';
import data from './components/StoryData/Ch02.json';

interface StoryContextType {
  contactDataSere: {
      profileImg: string; name: string; discovered: boolean; latestMessage: string;
  };
  setContactDataSere: React.Dispatch<React.SetStateAction<{ name: string }>>;
  contactDataKaede: {
    profileImg: string; name: string; discovered: boolean; latestMessage: string;
  };
  setContactDataKaede: React.Dispatch<React.SetStateAction<{ name: string }>>;
  contactDataWillian: {
    profileImg: string; name: string; discovered: boolean; latestMessage: string;
  };
  setContactDataWillian: React.Dispatch<React.SetStateAction<{ name: string }>>;
  contactDataIshtar: {
    profileImg: string; name: string; discovered: boolean; latestMessage: string;
  };
  setContactDataIshtar: React.Dispatch<React.SetStateAction<{ name: string }>>;
  groupDataMain: {
    profileImg: string; name: string; discovered: boolean; latestMessage: string;
  };
  setGroupDataMain: React.Dispatch<React.SetStateAction<{ name: string }>>;
  currentId: number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<number | null>>;
  showChoices: boolean;
  setShowChoices: React.Dispatch<React.SetStateAction<boolean>>;
  sereChoices: { option: ChoiceOption; next: number }[];
  setSereChoices: React.Dispatch<React.SetStateAction<{option: ChoiceOption, next: number}[]>>;
  showSereChoices: boolean;
  setShowSereChoices: React.Dispatch<React.SetStateAction<boolean>>;
  kaedeChoices: { option: ChoiceOption; next: number }[];
  setKaedeChoices: React.Dispatch<React.SetStateAction<{option: ChoiceOption, next: number}[]>>;
  showKaedeChoices: boolean;
  setShowKaedeChoices: React.Dispatch<React.SetStateAction<boolean>>;
  willianChoices: { option: ChoiceOption; next: number }[];
  setWillianChoices: React.Dispatch<React.SetStateAction<{option: ChoiceOption, next: number}[]>>;
  showWillianChoices: boolean;
  setShowWillianChoices: React.Dispatch<React.SetStateAction<boolean>>;
  ishtarChoices: { option: ChoiceOption; next: number }[];
  setIshtarChoices: React.Dispatch<React.SetStateAction<{option: ChoiceOption, next: number}[]>>;
  showIshtarChoices: boolean;
  setShowIshtarChoices: React.Dispatch<React.SetStateAction<boolean>>;
  sereMessages: JSX.Element[];
  kaedeMessages: JSX.Element[];
  willianMessages: JSX.Element[];
  ishtarMessages: JSX.Element[];
  groupMainMessages: JSX.Element[];
  choices: { option: ChoiceOption; next: number }[];
  setChoices: React.Dispatch<React.SetStateAction<ChoiceOption[]>>;
  showStartButton: boolean;
  setShowStartButton: React.Dispatch<React.SetStateAction<boolean>>;
  displayedMessages: JSX.Element[];
  setDisplayedMessages: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  handleChoice: (next: number, option: { text: string; delay: number; alignment: "left" | "right" | "center" | "none"; recipient?: string }) => void;
  startStory: (id: number) => void;
}

type Message = {
  id: number;
  recipient?: "sere" | "kaede" | "ishtar" | "willian";
  type: "message";
  subtype?: "text" | "image" | "emoji";
  content: string;
  delay: number;
  alignment: "left" | "right" | "center" | "none";
  next: number | null;
  flag?: string;
  width?: string;
};

type ChoiceOption = {
  text: string;
  delay: number;
  alignment: "left" | "right" | "center" | "none";
  subtype?: "text" | "image" | "emoji";
  recipient?: "sere" | "kaede" | "ishtar" | "willian";
  next: number;
};

type Choice = {
  id: number;
  recipient?: "sere" | "kaede" | "ishtar" | "willian";
  type: "choice";
  content?: {
      text?: string;
      delay: number;
      subtype?: "text" | "image" | "emoji";
      alignment: "left" | "right" | "center" | "none";
  };
  choices: { option: ChoiceOption; next: number }[];
  next: number | null;
  flag?: string;
};

type GroupMessage = {
  id: number;
  type: "group-message";
  recipient: string;
  sender: string;
  content: string;
  initialMsg?: boolean;
  showPfp?: boolean;
  subtype?: "text" | "image" | "emoji";
  delay: number;
  alignment: "left" | "right" | "center" | "none";
  next: number | null;
  flag?: string;
}

type StoryElement = Message | Choice | GroupMessage;

const defaultState: StoryContextType = {
  displayedMessages: [],
  setDisplayedMessages: () => { },
  currentId: null,
  setCurrentId: () => { },
  choices: [],
  setChoices: () => { },
  sereChoices: [],
  setSereChoices: () => { },
  kaedeChoices: [],
  setKaedeChoices: () => { },
  willianChoices: [],
  setWillianChoices: () => { },
  ishtarChoices: [],
  setIshtarChoices: () => { },
  showStartButton: false,
  setShowStartButton: () => { },
  showChoices: false,
  setShowChoices: () => { },
  showSereChoices: false,
  setShowSereChoices: () => { },
  showKaedeChoices: false,
  setShowKaedeChoices: () => { },
  showWillianChoices: false,
  setShowWillianChoices: () => { },
  showIshtarChoices: false,
  setShowIshtarChoices: () => { },
  contactDataSere: { name: 'Unknown', profileImg: 'Unknown.png', discovered: true, latestMessage: '' },
  setContactDataSere: () => { },
  contactDataKaede: { name: 'Kaede', profileImg: 'Kaede01.png', discovered: false, latestMessage: '[New contact added]' },
  setContactDataKaede: () => { },
  contactDataWillian: { name: 'Willian', profileImg: 'Willian01.png', discovered: false, latestMessage: '[New contact added]' },
  setContactDataWillian: () => { },
  contactDataIshtar: { name: 'Ishtar', profileImg: 'Ishtar02.png', discovered: false, latestMessage: '[New contact added]' },
  setContactDataIshtar: () => { },
  groupDataMain: { name: 'nerd chat (PLUS KAEDE!! ✌)', profileImg: 'Unknown.png', discovered: false, latestMessage: '[added to group chat!]' },
  setGroupDataMain: () => { },
  handleChoice: () => { },
  sereMessages: [],
  kaedeMessages: [],
  willianMessages: [],
  ishtarMessages: [],
  groupMainMessages: [],
  startStory: () => { }
};

const StoryContext = createContext<StoryContextType>(defaultState);

const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [displayedMessages, setDisplayedMessages] = useState<JSX.Element[]>([]);
  const [sereMessages, setSereMessages] = useState<JSX.Element[]>([]);
  const [kaedeMessages, setKaedeMessages] = useState<JSX.Element[]>([]);
  const [willianMessages, setWillianMessages] = useState<JSX.Element[]>([]);
  const [ishtarMessages, setIshtarMessages] = useState<JSX.Element[]>([]);
  const [groupMainMessages, setGroupMainMessages] = useState<JSX.Element[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [sereChoices, setSereChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
  const [showSereChoices, setShowSereChoices] = useState<boolean>(false);
  const [kaedeChoices, setKaedeChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
  const [showKaedeChoices, setShowKaedeChoices] = useState<boolean>(false);
  const [willianChoices, setWillianChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
  const [showWillianChoices, setShowWillianChoices] = useState<boolean>(false);
  const [ishtarChoices, setIshtarChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
  const [showIshtarChoices, setShowIshtarChoices] = useState<boolean>(false);
  const [choices, setChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [contactDataSere, setContactDataSere] = useState<{ name: string, profileImg: string, discovered: boolean, latestMessage: string }>({ name: 'Unknown', profileImg: 'Unknown.png', discovered: true, latestMessage: '' });
  const [contactDataKaede, setContactDataKaede] = useState<{ name: string, profileImg: string, discovered: boolean, latestMessage: string }>({ name: 'Kaede', profileImg: 'Kaede01.png', discovered: false, latestMessage: '[New contact added]' });
  const [contactDataWillian, setContactDataWillian] = useState<{ name: string, profileImg: string, discovered: boolean, latestMessage: string }>({ name: 'Willian', profileImg: 'Willian01.png', discovered: false, latestMessage: '[New contact added]' });
  const [contactDataIshtar, setContactDataIshtar] = useState<{ name: string, profileImg: string, discovered: boolean, latestMessage: string }>({ name: 'Ishtar', profileImg: 'Ishtar02.png', discovered: false, latestMessage: '[New contact added]' });
  const [groupDataMain, setGroupDataMain] = useState<{ name: string, profileImg: string, discovered: boolean, latestMessage: string }>({ name: 'nerd chat (PLUS KAEDE!! ✌)', profileImg: 'Unknown.png', discovered: false, latestMessage: '[added to group chat!]' });

  useEffect(() => {
    const storyData: StoryElement[] = data as StoryElement[];

    if (currentId === null) return;

    const currentElement = storyData.find(element => element.id === currentId);

    if (!currentElement) return;

    if (currentElement.flag === 'updateSereNameToSerenay') {
      setContactDataSere(prevState => ({ ...prevState, name: "Serenay", profileImg: "Serenay01.png"}));
    }

    if (currentElement.flag === 'friendsDiscovered') {
      setContactDataKaede(prevState => ({ ...prevState, discovered: true }));
      setContactDataWillian(prevState => ({ ...prevState, discovered: true }));
      setContactDataIshtar(prevState => ({ ...prevState, discovered: true }));
    }

    if (currentElement.flag === 'groupChatDiscovered') {
      setGroupDataMain(prevState => ({ ...prevState, discovered: true }));
    }

    if (currentElement.type === "message") {
      if (currentElement.subtype === "image") {
        switch (currentElement.recipient) {
          case 'sere': {
            const newSereMessage = (
              <img key={currentElement.id} className={`image ${currentElement.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content}`} />
            );
            setSereMessages(prevMessages => [...prevMessages, newSereMessage]);
        
            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
            break;
          }
          case 'kaede': {
            const newKaedeMessage = (
              <img key={currentElement.id} className={`image ${currentElement.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content}`} />
            );
            setKaedeMessages(prevMessages => [...prevMessages, newKaedeMessage]);
        
            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
            break;
          }
        case 'willian': {
          const newWillianMessage = (
            <img key={currentElement.id} className={`image ${currentElement.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content}`} />
          );
          setWillianMessages(prevMessages => [...prevMessages, newWillianMessage]);
      
          setTimeout(() => {
            setCurrentId(currentElement.next);
          }, currentElement.delay);
          break;
        }
        case 'ishtar': {
          const newIshtarMessage = (
            <img key={currentElement.id} className={`image ${currentElement.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content}`} />
          );
          setIshtarMessages(prevMessages => [...prevMessages, newIshtarMessage]);
      
          setTimeout(() => {
            setCurrentId(currentElement.next);
          }, currentElement.delay);
          break;
        }
        default : {
          console.log('No recipient specified for image message');
        }
      }
      } else if (currentElement.subtype === "emoji") {
        const newMessage = (
          <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
              {currentElement.content}
          </p>
        );
        setDisplayedMessages(prevMessages => [...prevMessages, newMessage]);
  
        setTimeout(() => {
          setCurrentId(currentElement.next);
        }, currentElement.delay);
      } else {
        switch (currentElement.recipient) {
          case 'sere': {
            const newSereMessage = (
              <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
                {currentElement.content}
              </p>
            );
            setSereMessages(prevMessages => [...prevMessages, newSereMessage]);
            setContactDataSere(prevState => ({ ...prevState, latestMessage: currentElement.content }));
            console.log(`${currentElement.id} added to sereMessages`)
        
            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
            break;
          }
          case 'kaede': {
            const newKaedeMessage = (
              <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
                {currentElement.content}
              </p>
            );
            setKaedeMessages(prevMessages => [...prevMessages, newKaedeMessage]);
            setContactDataKaede(prevState => ({ ...prevState, latestMessage: currentElement.content }));
            console.log(`${currentElement.id} added to kaedeMessages`)
        
            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
            break;
          }
          case 'willian': {
            const newWillianMessage = (
              <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
                {currentElement.content}
              </p>
            );
            setWillianMessages(prevMessages => [...prevMessages, newWillianMessage]);
            setContactDataWillian(prevState => ({ ...prevState, latestMessage: currentElement.content }));
            console.log(`${currentElement.id} added to willianMessages`)

            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
            break;
          }
          case 'ishtar': {
            const newIshtarMessage = (
              <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
                {currentElement.content}
              </p>
            );
            setIshtarMessages(prevMessages => [...prevMessages, newIshtarMessage]);
            setContactDataIshtar(prevState => ({ ...prevState, latestMessage: currentElement.content }));
            console.log(`${currentElement.id} added to ishtarMessages`)
        
            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
            break;
          }
          default: {
            console.log('No recipient specified for emoji message');
            break;
          }
        }
      } 
    }
    
    // CHOICE SECTION
    else if (currentElement.type === 'choice') {
      if (currentElement.content?.subtype === 'image') {
        switch (currentElement.recipient) {
          case 'sere': {
            const choiceContent = (
              <img key={`choice-content-${currentElement.id}`} className={`image ${currentElement.content.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content.text}`} />
            );
            setSereMessages(prevMessages => [...prevMessages, choiceContent]);
        
            setTimeout(() => {
              setSereChoices(currentElement.choices);
              setShowSereChoices(true);
            }, currentElement.content.delay);
            break;
          }
          case 'kaede': {
            const choiceContent = (
              <img key={`choice-content-${currentElement.id}`} className={`image ${currentElement.content.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content.text}`} />
            );
            setKaedeMessages(prevMessages => [...prevMessages, choiceContent]);
        
            setTimeout(() => {
              setKaedeChoices(currentElement.choices);
              setShowKaedeChoices(true);
            }, currentElement.content.delay);
            break;
          }
          case 'willian': {
            const choiceContent = (
              <img key={`choice-content-${currentElement.id}`} className={`image ${currentElement.content.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content.text}`} />
            );
            setWillianMessages(prevMessages => [...prevMessages, choiceContent]);
        
            setTimeout(() => {
              setWillianChoices(currentElement.choices);
              setShowWillianChoices(true);
            }, currentElement.content.delay);
            break;
          }
          case 'ishtar': {
            const choiceContent = (
              <img key={`choice-content-${currentElement.id}`} className={`image ${currentElement.content.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content.text}`} />
            );
            setIshtarMessages(prevMessages => [...prevMessages, choiceContent]);
        
            setTimeout(() => {
              setIshtarChoices(currentElement.choices);
              setShowIshtarChoices(true);
            }, currentElement.content.delay);
            break;
          }
        }

        const choiceContent = (
            <img key={`choice-content-${currentElement.id}`} className={`image ${currentElement.content.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content.text}`} />
        );
        setDisplayedMessages(prevMessages => [...prevMessages, choiceContent]);

        setTimeout(() => {
            setChoices(currentElement.choices);
            setShowChoices(true);
        }, currentElement.content.delay);
      } else if (currentElement.content?.subtype === 'emoji') {
        const choiceContent = (
            <img key={`choice-content-${currentElement.id}`} className={`image ${currentElement.content.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content.text}`} />
        );
        setDisplayedMessages(prevMessages => [...prevMessages, choiceContent]);

        setTimeout(() => {
            setChoices(currentElement.choices);
            setShowChoices(true);
        }, currentElement.content.delay);
      } else if (currentElement.content) {
        switch (currentElement.recipient) {
          case 'sere': {
            const choiceContent = (
              <p key={`choice-content-${currentElement.id}`} className={`message ${currentElement.content.alignment}`}>
                  {currentElement.content.text}
              </p>
            );
            setSereMessages(prevMessages => [...prevMessages, choiceContent]);
            setContactDataSere(prevState => ({ ...prevState, latestMessage: currentElement.content.text || "[missing string]" }));
            console.log(`${currentElement.id} added to sereMessages`);
        
            setTimeout(() => {
              setSereChoices(currentElement.choices);
              setShowSereChoices(true);
            }, currentElement.content.delay);
            break;
          }
          case 'kaede': {
            const choiceContent = (
              <p key={`choice-content-${currentElement.id}`} className={`message ${currentElement.content.alignment}`}>
                  {currentElement.content.text}
              </p>
            );
            setKaedeMessages(prevMessages => [...prevMessages, choiceContent]);
            setContactDataKaede(prevState => ({ ...prevState, latestMessage: currentElement.content.text || "[missing string]" }));
        
            setTimeout(() => {
              setKaedeChoices(currentElement.choices);
              setShowKaedeChoices(true);
            }, currentElement.content.delay);
            break;
          }
          case 'willian': {
            const choiceContent = (
              <p key={`choice-content-${currentElement.id}`} className={`message ${currentElement.content.alignment}`}>
                  {currentElement.content.text}
              </p>
            );
            setWillianMessages(prevMessages => [...prevMessages, choiceContent]);
            setContactDataWillian(prevState => ({ ...prevState, latestMessage: currentElement.content.text || "[missing string]" }));
        
            setTimeout(() => {
              setWillianChoices(currentElement.choices);
              setShowWillianChoices(true);
            }, currentElement.content.delay);
            break;
          }
          case 'ishtar': {
            const choiceContent = (
              <p key={`choice-content-${currentElement.id}`} className={`message ${currentElement.content.alignment}`}>
                  {currentElement.content.text}
              </p>
            );
            setIshtarMessages(prevMessages => [...prevMessages, choiceContent]);
            setContactDataIshtar(prevState => ({ ...prevState, latestMessage: currentElement.content.text || "[missing string]" }));
        
            setTimeout(() => {
              setIshtarChoices(currentElement.choices);
              setShowIshtarChoices(true);
            }, currentElement.content.delay);
            break;
          }
        }
      } else {
        switch (currentElement.recipient) {
          case 'sere': {
            setSereChoices(currentElement.choices);
            setShowSereChoices(true);
            break;
          }
          case 'kaede': {
            setKaedeChoices(currentElement.choices);
            setShowKaedeChoices(true);
            break;
          }
          case 'willian': {
            setWillianChoices(currentElement.choices);
            setShowWillianChoices(true);
            break;
          }
          case 'ishtar': {
            setIshtarChoices(currentElement.choices);
            setShowIshtarChoices(true);
            break;
          }
          default: {
            console.log('No recipient specified for choice message');
            break;
          }
        }
      }
    }

    // GROUP CHAT SECTION
    else if (currentElement.type === 'group-message') {
      const groupMessageSenderPfp = (() => {
        switch (currentElement.sender) {
          case 'sere':
            return `/images/contacts/${contactDataSere.profileImg}`;
          case 'kaede':
            return `/images/contacts/${contactDataKaede.profileImg}`;
          case 'willian':
            return `/images/contacts/${contactDataWillian.profileImg}`;
          case 'ishtar':
            return `/images/contacts/${contactDataIshtar.profileImg}`;
          case 'amir':
            return `/images/contacts/Amir01.png`;
          default:
            return '/images/contacts/default-pfp.png';
        }
      })();

      const groupMessageSenderName = (() => {
        switch (currentElement.sender) {
          case 'sere':
            return `${contactDataSere.name}`;
          case 'kaede':
            return `${contactDataKaede.name}`;
          case 'willian':
            return `${contactDataWillian.name}`;
          case 'ishtar':
            return `${contactDataIshtar.name}`;
          case 'amir':
            return 'Amir';
          default:
            return '/images/contacts/default-pfp.png';
        }
      })();

      // const newGroupMessage = (
      //   <div className='flex flex-row w-full'>
      //     <div className='h-7 w-7'>
      //       {currentElement.type === "group-message" && currentElement.initialMsg === true && currentElement.sender !== 'amir' ? (
      //         <img className="w-7 h-7 rounded-full" src={groupMessageSenderPfp} />) : null
      //       }         
      //     </div>
      //     <div className="flex flex-col my-2 ml-4 items-left justify-center">
      //       {currentElement.type === "group-message" && currentElement.initialMsg === true && currentElement.sender !== 'amir' ? (
      //         <div className='flex flex-row items-center align-center mt-2'>

      //           <p className='text-sm pl-1'>{groupMessageSenderName}</p>
      //         </div>
      //       ) : null}
      //       <p key={currentElement.id} className={`group-message ${currentElement.alignment} sndr-${currentElement.sender}`}>
      //       {currentElement.content}
      //       </p>
      //     </div>
      //   </div>
      // );

      const newGroupMessage = (
        <div className='w-full flex flex-row'>
          {currentElement.type === "group-message" && currentElement.sender !== 'amir' ? (
            <div className="w-full flex flex-row my-1">
              <div className="w-12 h-12">
                {currentElement.initialMsg === true ? (
                  <img className="w-9 h-9 rounded-full mt-4 ml-1" src={groupMessageSenderPfp} />
                ) : null }
              </div>
              <div className='flex flex-col w-5/6'>
                {currentElement.initialMsg === true ? (
                  <p className='text-xs pl-1'>{groupMessageSenderName}</p>
                ) : null }
                <p key={currentElement.id} className={`group-message ${currentElement.alignment} sndr-${currentElement.sender}`}>
                  {currentElement.content}
                </p>
              </div>

            </div>
          ) : (
            <div className="w-full flex flex-col">
              <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
                {currentElement.content}
              </p>
            </div>

          ) }
        </div>
      );


      setGroupMainMessages(prevMessages => [...prevMessages, newGroupMessage]);
      setGroupDataMain(prevState => ({ ...prevState, latestMessage: currentElement.content || "[missing string]" }));
  
      setTimeout(() => {
        setCurrentId(currentElement.next);
      }, currentElement.delay);
    }
  } , [currentId]);

  const startStory = (id: number) => {
    setCurrentId(id);
    setDisplayedMessages([]);
    setShowStartButton(false);
    console.log('Story started');
  };

const handleChoice = (next, option) => {
    switch (option.recipient) {
      case 'sere': {
        setShowChoices(false);
        setShowSereChoices(false);
        const choiceMessage = (
          <p key={`choice-${next}`} className={`message ${option.alignment}`}>
              {option.text}
          </p>
        );
        setSereMessages(prevMessages => [...prevMessages, choiceMessage]);
        setContactDataSere(prevState => ({ ...prevState, latestMessage: option.text }));

        setTimeout(() => {
          setCurrentId(next);
      }, option.delay);
        break;
      }
      case 'kaede': {
        setShowChoices(false);
        setShowKaedeChoices(false);
        const choiceMessage = (
          <p key={`choice-${next}`} className={`message ${option.alignment}`}>
              {option.text}
          </p>
        );
        setKaedeMessages(prevMessages => [...prevMessages, choiceMessage]);
        setContactDataKaede(prevState => ({ ...prevState, latestMessage: option.text }));

        setTimeout(() => {
          setCurrentId(next);
      }, option.delay);
        break;
      }
      case 'willian': {
        setShowChoices(false);
        setShowWillianChoices(false);
        const choiceMessage = (
          <p key={`choice-${next}`} className={`message ${option.alignment}`}>
              {option.text}
          </p>
        );
        setWillianMessages(prevMessages => [...prevMessages, choiceMessage]);
        setContactDataWillian(prevState => ({ ...prevState, latestMessage: option.text }));

        setTimeout(() => {
          setCurrentId(next);
      }, option.delay);
        break;
      }
      case 'ishtar': {
        setShowChoices(false);
        setShowIshtarChoices(false);
        const choiceMessage = (
          <p key={`choice-${next}`} className={`message ${option.alignment}`}>
              {option.text}
          </p>
        );
        setIshtarMessages(prevMessages => [...prevMessages, choiceMessage]);
        setContactDataIshtar(prevState => ({ ...prevState, latestMessage: option.text }));

        setTimeout(() => {
          setCurrentId(next);
      }, option.delay);
        break;
      } 
    }
  }

  

  return (
      <StoryContext.Provider value={{ 
        sereChoices, 
        kaedeChoices, 
        willianChoices, 
        ishtarChoices, 
        showSereChoices, 
        showKaedeChoices, 
        showWillianChoices, 
        showIshtarChoices, 
        willianMessages, 
        ishtarMessages, 
        sereMessages, 
        kaedeMessages, 
        groupMainMessages,
        handleChoice, 
        choices, 
        showChoices, 
        startStory, 
        showStartButton, 
        setCurrentId, 
        contactDataSere, 
        contactDataKaede, 
        contactDataWillian, 
        contactDataIshtar, 
        displayedMessages, 
        setContactDataSere: () => {}, 
        setContactDataKaede: () => {}, 
        setContactDataWillian: () => {}, 
        setContactDataIshtar: () => {},
        currentId, 
        setShowChoices, 
        setSereChoices, 
        setShowSereChoices, 
        setKaedeChoices, 
        setShowKaedeChoices, 
        setWillianChoices, 
        setShowWillianChoices, 
        setIshtarChoices, 
        setShowIshtarChoices,
        setChoices: () => {},
        setShowStartButton,
        setDisplayedMessages,
        groupDataMain,
        setGroupDataMain: () => {}
      }}>
        {children}
      </StoryContext.Provider>
    );
};

export { StoryProvider, StoryContext };