import './App.css'
import ShortcutBar from './components/ShortcutBar'
import StatusBar from './components/StatusBar'

export default function App() {

  return (
      <div className="main">
        <StatusBar />
        <div>
          <p className="text-3xl text-green-700">Hello.</p>
        </div>
        <ShortcutBar />
      </div>
  )
}

