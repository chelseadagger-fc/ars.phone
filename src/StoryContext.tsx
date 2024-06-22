import { createContext, useState, useEffect, ReactNode, SetStateAction } from 'react';
import data from './components/StoryData/Ch01.json';

interface StoryContextType {
  story: Story;
  setStory: React.Dispatch<React.SetStateAction<Story>>;
  contactDataSere: { name: string };
  setContactDataSere: React.Dispatch<React.SetStateAction<{ name: string }>>;
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
  type: "message";
  subtype?: "text" | "image" | "emoji";
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
  contactDataSere: { name: 'Unknown' },
  setContactDataSere: () => { },
  handleChoice: () => { }
};

const storyData: StoryElement[] = data as StoryElement[];

const StoryContext = createContext<StoryContextType>(defaultState);

const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [story, setStory] = useState({ messages: [] });
  const [displayedMessages, setDisplayedMessages] = useState<JSX.Element[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [choices, setChoices] = useState<{ option: ChoiceOption; next: number }[]>([]);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [contactDataSere, setContactDataSere] = useState<{ name: string }>({ name: 'Unknown' });

  useEffect(() => {
    const storyData: StoryElement[] = data as StoryElement[];
    setStory({ messages: storyData });

    if (currentId === null) return;

    const currentElement = storyData.find(element => element.id === currentId);

    if (!currentElement) return;

    if (currentElement.flag === 'updateSereNameToSerenay') {
      setContactDataSere({ name: "Serenay" });
    }

    if (currentElement.type === "message") {
      if (currentElement.subtype === "image") {
        const newMessage = (
          <img key={currentElement.id} className={`image ${currentElement.alignment} w-64 my-3`} src={`/images/attachments/${currentElement.content}`} />
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
    
    else if (currentElement.type === 'choice') {
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
  } , [currentId]);

  const startStory = () => {
    setCurrentId(1);
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
    <StoryContext.Provider value={{ handleChoice, choices, showChoices, startStory, showStartButton, story, setCurrentId, contactDataSere, displayedMessages }}>
      {children}
    </StoryContext.Provider>
  );
};

export { StoryProvider, StoryContext };