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
  setContactDataSere: () => { }
};

const storyData: StoryElement[] = data as StoryElement[];

const StoryContext = createContext<StoryContextType>(defaultState);

const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [story, setStory] = useState({ messages: [] });
  const [displayedMessages, setDisplayedMessages] = useState<JSX.Element[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [contactDataSere, setContactDataSere] = useState<{ name: string }>({ name: 'Unknown' });

  const handleChoice = (next: number, option: { text: string; delay: number; alignment: "left" | "right" | "center"; }) => {
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

  const addMessageInSequence = () => {
    if (story.messages && displayedMessages.length < story.messages.length) {
        const nextMessage = story.messages[displayedMessages.length];
        setDisplayedMessages([...displayedMessages, <div key={nextMessage.id} className={`message ${nextMessage.alignment}`}>{nextMessage.content}</div>]);
    }
};

  useEffect(() => {
    const storyData: StoryElement[] = data as StoryElement[];
    setStory({ messages: storyData });

  } , [currentId]);

  return (
    <StoryContext.Provider value={{ story, contactDataSere, displayedMessages, addMessageInSequence }}>
      {children}
    </StoryContext.Provider>
  );
};

export { StoryProvider, StoryContext };