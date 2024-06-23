import { createContext, useState, useEffect, ReactNode } from 'react';
import data from './components/StoryData/Ch01.json';

interface StoryContextType {
  story: Story;
  setStory: React.Dispatch<React.SetStateAction<Story>>;
  contactDataSere: {
      profileImg: string; name: string; discovered: boolean;
  };
  setContactDataSere: React.Dispatch<React.SetStateAction<{ name: string }>>;
  contactDataKaede: {
    profileImg: string; name: string; discovered: boolean;
  };
  setContactDataKaede: React.Dispatch<React.SetStateAction<{ name: string }>>;
  contactDataWillian: {
    profileImg: string; name: string; discovered: boolean;
  };
  setContactDataWillian: React.Dispatch<React.SetStateAction<{ name: string }>>;
  contactDataIshtar: {
    profileImg: string; name: string; discovered: boolean;
  };
  setContactDataIshtar: React.Dispatch<React.SetStateAction<{ name: string }>>;
  currentId: number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<number | null>>;
  showChoices: boolean;
  setShowChoices: React.Dispatch<React.SetStateAction<boolean>>;
  choices: string[];
  setChoices: React.Dispatch<React.SetStateAction<string[]>>;
  showStartButton: boolean;
  setShowStartButton: React.Dispatch<React.SetStateAction<boolean>>;
  displayedMessages: JSX.Element[];
  setDisplayedMessages: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  handleChoice: (next: number, option: { text: string; delay: number; alignment: "left" | "right" | "center"; }) => void;
}

type Message = {
  id: number;
  recipient?: "sere" | "kaede" | "ishtar" | "willian";
  type: "message";
  subtype?: "text" | "image" | "emoji";
  content: string;
  delay: number;
  alignment: "left" | "right" | "center";
  next: number | null;
  flag?: string;
  width?: string;
};

type ChoiceOption = {
  text: string;
  delay: number;
  alignment: "left" | "right" | "center";
  subtype?: "text" | "image" | "emoji";
};

type Choice = {
  id: number;
  recipient?: "sere" | "kaede" | "ishtar" | "willian";
  type: "choice";
  content?: {
      text?: string;
      delay: number;
      subtype?: "text" | "image" | "emoji";
      alignment: "left" | "right" | "center";
  };
  choices: string[];
  next: number | null;
  flag?: string;
};

type StoryElement = Message | Choice;

const defaultState: StoryContextType = {
  story: {
    id: '',
    title: '',
    content: ''
  },
  setStory: () => { },
  displayedMessages: [],
  setDisplayedMessages: () => { },
  currentId: null,
  setCurrentId: () => { },
  choices: [],
  setChoices: () => { },
  showStartButton: false,
  setShowStartButton: () => { },
  showChoices: false,
  setShowChoices: () => { },
  contactDataSere: { name: 'Unknown', profileImg: 'Unknown.png', discovered: true },
  setContactDataSere: () => { },
  contactDataKaede: { name: 'Kaede', profileImg: 'Kaede01.png', discovered: false },
  setContactDataKaede: () => { },
  contactDataWillian: { name: 'Willian', profileImg: 'Willian01.png', discovered: false },
  setContactDataWillian: () => { },
  contactDataIshtar: { name: 'Ishtar', profileImg: 'Ishtar01.png', discovered: false },
  setContactDataIshtar: () => { },
  handleChoice: () => { }
};

const storyData: StoryElement[] = data as StoryElement[];

const StoryContext = createContext<StoryContextType>(defaultState);

const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [story, setStory] = useState({ messages: [] });
  const [displayedMessages, setDisplayedMessages] = useState<JSX.Element[]>([]);
  const [sereMessages, setSereMessages] = useState<JSX.Element[]>([]);
  const [kaedeMessages, setKaedeMessages] = useState<JSX.Element[]>([]);
  const [willianMessages, setWillianMessages] = useState<JSX.Element[]>([]);
  const [ishtarMessages, setIshtarMessages] = useState<JSX.Element[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [choices, setChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [contactDataSere, setContactDataSere] = useState<{ name: string, profileImg: string, discovered: boolean }>({ name: 'Unknown', profileImg: 'Unknown.png', discovered: true});
  const [contactDataKaede, setContactDataKaede] = useState<{ name: string, profileImg: string, discovered: boolean }>({ name: 'Kaede', profileImg: 'Kaede01.png', discovered: false});
  const [contactDataWillian, setContactDataWillian] = useState<{ name: string, profileImg: string, discovered: boolean }>({ name: 'Willian', profileImg: 'Willian01.png', discovered: false});
  const [contactDataIshtar, setContactDataIshtar] = useState<{ name: string, profileImg: string, discovered: boolean }>({ name: 'Ishtar', profileImg: 'Ishtar01.png', discovered: false});

  useEffect(() => {
    const storyData: StoryElement[] = data as StoryElement[];
    setStory({ messages: storyData });

    if (currentId === null) return;

    const currentElement = storyData.find(element => element.id === currentId);

    if (!currentElement) return;

    if (currentElement.flag === 'updateSereNameToSerenay') {
      setContactDataSere({ name: "Serenay", profileImg: "Serenay01.png"});
    }

    if (currentElement.type === "message") {
      if (currentElement.subtype === "image") {
        const newMessage = (
          <img key={currentElement.id} className={`image ${currentElement.alignment} w-4/6 my-3 rounded-xl`} src={`/images/${currentElement.content}`} />
        );
        setDisplayedMessages(prevMessages => [...prevMessages, newMessage]);
  
        setTimeout(() => {
          setCurrentId(currentElement.next);
        }, currentElement.delay);
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
        
            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
            break;
          }
          default: {
            const newMessage = (
              <p key={currentElement.id} className={`message ${currentElement.alignment}`}>
                {currentElement.content}
              </p>
            );
            setDisplayedMessages(prevMessages => [...prevMessages, newMessage]);
        
            setTimeout(() => {
              setCurrentId(currentElement.next);
            }, currentElement.delay);
          }
        }
      } 
    }
    
    else if (currentElement.type === 'choice') {
      if (currentElement.content?.subtype === 'image') {
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
  } , [currentId]);

  const startStory = () => {
    setCurrentId(173);
    setDisplayedMessages([]);
    setShowStartButton(false);
    console.log('Story started');
};

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
  

  return (
    <StoryContext.Provider value={{ willianMessages, ishtarMessages, sereMessages, kaedeMessages, handleChoice, choices, showChoices, startStory, showStartButton, story, setCurrentId, contactDataSere, contactDataKaede, contactDataWillian, contactDataIshtar, displayedMessages }}>
      {children}
    </StoryContext.Provider>
  );
};

export { StoryProvider, StoryContext };