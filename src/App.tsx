import React from 'react'
import './App.css'
import Contacts from './components/ContactsScreen/Contacts'
import HomeScreen from './components/HomeScreen/HomeScreen'
import Messages from './components/MessagesScreen/Messages'
import Serenay from './components/MessagesScreen/Serenay'
import UnknownStart from './components/MessagesScreen/UnknownStart'

export default function App() {

  interface StateTypes {
    screenTitle: string;
  }

  interface MessagesTypes {
    name: string;
}

  const [activeScreen, setActiveScreen] = React.useState<StateTypes>({screenTitle: 'home'})
  const [msgSereData, setMsgSereData] = React.useState<MessagesTypes>({name: 'UNKNOWN'})

  const handleChangeScreen = (newScreen: string) => { setActiveScreen({screenTitle: newScreen});};

  const showActiveScreen = (activeScreen.screenTitle === 'home' ? <HomeScreen onAppPress={handleChangeScreen} /> :
      activeScreen.screenTitle === 'contacts' ? (<Contacts />) :
      activeScreen.screenTitle === 'messages' ? (<Messages onAppPress={handleChangeScreen} sereName={msgSereData.name} />) :
      activeScreen.screenTitle === 'unknownstart' ? (<UnknownStart onAppPress={handleChangeScreen} />) :
      activeScreen.screenTitle === 'sere' ? (<Serenay onAppPress={handleChangeScreen} sereName={msgSereData.name} />) : null ) 

  return(
    <div>
      {showActiveScreen}
    </div>

  )
}