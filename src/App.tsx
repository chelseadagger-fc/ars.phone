import './App.css'
import PushNotification from './components/PushNotification'
import CurrentScreen from './components/CurrentScreen'

export default function App() {

  return (
      <div className="h-dvh w-dvw bg-slate-400">
        <PushNotification />
        <CurrentScreen />
      </div>
  )
}

