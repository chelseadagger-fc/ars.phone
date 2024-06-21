import React, { useState } from 'react'
import './App.css'
import HomeScreen from './components/HomeScreen/HomeScreen'
import Messages from './components/MessagesScreen/Messages'
import Serenay from './components/MessagesScreen/Serenay'

export default function App() {

  interface MessagesTypes {
    name: string;
}

  const [activeScreen, setActiveScreen] = React.useState<string>('HomeScreen')
  const [msgSereData, setMsgSereData] = React.useState<MessagesTypes>({name: 'UNKNOWN'})

  const navigateTo = (newScreen: string) => {
    setActiveScreen(newScreen);
  };

  // const handleChangeScreen = (newScreen: string) => { setActiveScreen({screenTitle: newScreen});};
  // const showActiveScreen = (activeScreen.screenTitle === 'home' ? <HomeScreen onAppPress={handleChangeScreen} /> :
  //     activeScreen.screenTitle === 'contacts' ? (<Contacts />) :
  //     activeScreen.screenTitle === 'messages' ? (<Messages onAppPress={handleChangeScreen} msgSereData={msgSereData} />) :
  //     activeScreen.screenTitle === 'sere' ? (<Serenay onAppPress={handleChangeScreen} msgSereData={msgSereData} setMsgSereData={setMsgSereData} />) : null ) 

  return(
    <div>
        {activeScreen === 'HomeScreen' && <HomeScreen navigateTo={navigateTo} />}
        {activeScreen === 'Messages' && <Messages navigateTo={navigateTo} msgSereData={msgSereData} />}
        {activeScreen === 'TextingSerenay' && <Serenay
          navigateTo={navigateTo}
          msgSereData={msgSereData}
          setMsgSereData={setMsgSereData} />}
    </div>

  )
}