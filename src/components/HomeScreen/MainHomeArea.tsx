// @ts-nocheck
import { useContext, useEffect, useState } from 'react'; 
import Clock from 'react-clock';
import './Clock.css'; 
import { StoryContext } from '../../StoryContext';


export default function MainHomeArea() {
    
  const [clockTime, setClockTime] = useState(new Date());
  const { startStory, showStartButton } = useContext(StoryContext);
 

  useEffect(() => {
    const interval = setInterval(() => setClockTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return(
        <div className="h-5/6 flex flex-col text-white">
          <div className="flex flex-row justify-between items-center my-8 mx-10">
            <Clock 
              value={clockTime}
              size={"38vw"}
              secondHandLength={75}
              minuteHandLength={65}
              hourHandLength={35}
              hourHandWidth={5}
              minuteHandOppositeLength={1}
              hourHandOppositeLength={1}
              minuteMarksLength={0}
              hourMarksLength={7}
              hourMarksWidth={1} />
            <p>calendar</p>
          </div>
          <div className="text-3xl text-black-700 font-titillium flex flex-col justify-between h-48 mt-8">
            {showStartButton && <button className="text-4xl" onClick={() => startStory(1)}>Start Game</button>}
            {showStartButton && <button className="text-2xl" onClick={() => startStory(174)}>Checkpoint 1</button>}
            {showStartButton && <button className="text-2xl" onClick={() => startStory(230)}>Checkpoint 2</button>}
          </div>
        </div>
  )
}