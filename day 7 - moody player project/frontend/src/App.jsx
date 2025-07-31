import React from 'react'
import FacialExpression from './components/FacialExpression'
import MoodSongs from './components/MoodSongs'
import { useState } from 'react'
const App = () => {
    const [Songs , setSongs] = useState([])
  return (
    <div className='p-10 bg-zinc-400 h-screen'>
        <div className="">
        <FacialExpression setSongs = {setSongs}/>
        <MoodSongs Songs={Songs}/>
        </div>
    </div>
  )
}

export default App