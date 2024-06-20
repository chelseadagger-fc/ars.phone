import './App.css'
import ShortcutBar from './components/ShortcutBar'
import StatusBar from './components/StatusBar'

export default function App() {

  return (
      <div className="h-dvh w-dvw bg-slate-400">
        <StatusBar />
          <p className="text-3xl text-black-700">Hello.</p>
        <ShortcutBar />
      </div>
  )
}

