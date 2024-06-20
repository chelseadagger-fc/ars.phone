import React from "react"
import HomeScreen from "./HomeScreen/HomeScreen"
import Contacts from "./ContactsScreen/Contacts"

export default function CurrentScreen() {
    
    const [activeScreen, setActiveScreen] = React.useState('home')

    const showActiveScreen = (activeScreen === 'home' ? (<HomeScreen />) :
        activeScreen === 'contacts' ? (<Contacts />) : null ) 

    return(
        <div>
            {showActiveScreen}
        </div>
    )
}