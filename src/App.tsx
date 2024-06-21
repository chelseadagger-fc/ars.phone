import React, { useState } from 'react'
import './App.css'
import HomeScreen from './components/HomeScreen/HomeScreen'
import Messages from './components/MessagesScreen/Messages'
import Serenay from './components/MessagesScreen/Serenay'

export default function App() {

  interface ContactsTypes {
    name: string;
}

  const [activeScreen, setActiveScreen] = React.useState<string>('HomeScreen')
  const [contactDataSere, setContactDataSere] = React.useState<ContactsTypes>({name: 'UNKNOWN'})

  const navigateTo = (newScreen: string) => {
    setActiveScreen(newScreen);
  };

  // const handleChangeScreen = (newScreen: string) => { setActiveScreen({screenTitle: newScreen});};
  // const showActiveScreen = (activeScreen.screenTitle === 'home' ? <HomeScreen onAppPress={handleChangeScreen} /> :
  //     activeScreen.screenTitle === 'contacts' ? (<Contacts />) :
  //     activeScreen.screenTitle === 'messages' ? (<Messages onAppPress={handleChangeScreen} contactDataSere={contactDataSere} />) :
  //     activeScreen.screenTitle === 'sere' ? (<Serenay onAppPress={handleChangeScreen} contactDataSere={contactDataSere} setcontactDataSere={setcontactDataSere} />) : null ) 

  return(
    <div>
        {activeScreen === 'HomeScreen' && <HomeScreen navigateTo={navigateTo} />}
        {activeScreen === 'Messages' && <Messages navigateTo={navigateTo} contactDataSere={contactDataSere} />}
        {activeScreen === 'TextingSerenay' && <Serenay
          navigateTo={navigateTo}
          contactDataSere={contactDataSere}
          setContactDataSere={setContactDataSere} />}
    </div>

  )
}