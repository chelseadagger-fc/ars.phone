import React from 'react'
import './App.css'
import Contacts from './components/ContactsScreen/Contacts'
import HomeScreen from './components/HomeScreen/HomeScreen'
import Messages from './components/MessagesScreen/Messages'

export default function App() {

  interface StateTypes {
    screenTitle: string;
  }

  const [activeScreen, setActiveScreen] = React.useState<StateTypes>({screenTitle: 'home'})

  const handleChangeScreen = (newScreen: string) => { setActiveScreen({screenTitle: newScreen});};

  const showActiveScreen = (activeScreen.screenTitle === 'home' ? <HomeScreen onAppPress={handleChangeScreen} /> :
      activeScreen.screenTitle === 'contacts' ? (<Contacts />) :
      activeScreen.screenTitle === 'messages' ? (<Messages onAppPress={handleChangeScreen} />) : null ) 

  return(
    <div>
      {showActiveScreen}
    </div>

  )
}