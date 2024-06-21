import { createContext, useState, useEffect, ReactNode } from 'react';
import data from './components/StoryData/Ch01.json';

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

const storyData: StoryElement[] = data as StoryElement[];

const StoryContext = createContext<StoryElement | undefined>(undefined);

const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [story, setStory] = useState<typeof storyData | null>(null);

  useEffect(() => {
    // Load story data here if it was asynchronous. Since it's a static import, set it directly.
    setStory(storyData);
  }, []);

  return (
    <StoryContext.Provider value={{ story }}>
      {children}
    </StoryContext.Provider>
  );
};

export { StoryProvider, StoryContext };