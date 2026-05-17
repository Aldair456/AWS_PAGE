import { Header } from '../../components/Header'
import { Landing } from '../../components/Landing'
import '../../App.css'

export function Home() {
  return (
    <div className="app">
      <Header />
      <Landing />
    </div>
  )
}
