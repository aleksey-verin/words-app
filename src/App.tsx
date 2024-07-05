import './App.css'
import Header from '@/components/header/header'
import TabsContainer from '@/components/tabs/tabs-container'

function App() {

  return (
    <div className='h-full bg-background font-sans antialiased relative'>
      <Header />
      <TabsContainer />
    </div>
  )
}

export default App
