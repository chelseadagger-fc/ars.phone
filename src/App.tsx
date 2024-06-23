import React from 'react'
import './App.css'
import HomeScreen from './components/HomeScreen/HomeScreen'
import Messages from './components/MessagesScreen/Messages'
import Serenay from './components/MessagesScreen/Serenay'
import Kaede from './components/MessagesScreen/Kaede'

export default function App() {

  const [activeScreen, setActiveScreen] = React.useState<string>('HomeScreen')

  const navigateTo = (newScreen: string) => {
    setActiveScreen(newScreen);
  };

  return(
    <div className="max-w-xl">
        {activeScreen === 'HomeScreen' && <HomeScreen navigateTo={navigateTo} />}
        {activeScreen === 'Messages' && <Messages navigateTo={navigateTo} />}
        {activeScreen === 'TextingSerenay' && <Serenay navigateTo={navigateTo} />}
        {activeScreen === 'TextingKaede' && <Kaede navigateTo={navigateTo} />}
    </div>

  )
}