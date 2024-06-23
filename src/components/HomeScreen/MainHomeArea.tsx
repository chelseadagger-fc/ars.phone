import { useEffect, useState } from 'react'; 
import Clock from 'react-clock';
import './Clock.css'; 


export default function MainHomeArea() {
    
  const [clockTime, setClockTime] = useState(new Date());

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
          <p className="text-3xl text-black-700 font-titillium">MAIN HOME AREA</p>
        </div>
  )
}