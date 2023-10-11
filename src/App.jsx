import { useState, useCallback,useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState("")


  //useRef() hook 
  const passwordRef = useRef(null)

  const passwordCopiedToClipboard = useCallback(()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPWRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbers) str += "0123456789"
    if (characters) str += "!@#$%^&*()?/><"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numbers, characters, setPassword])


  //useEffect() hook ==>> runs every times if any changes in arguments

  useEffect(()=> {passwordGenerator()},[length,numbers, characters,setPassword])

  return (
    <>
      <div className='w-full max-w-md bg-gray-700 mx-auto shadow-md rounded-lg
     px-4 py-3 my-8 text-orange-500'>
        <h1 className='text-center my-3 font-bold'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button className='bg-green-500 py-2 px-2 text-black outline-none hover:bg-green-600'
          onClick={passwordCopiedToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={25}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
              
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numbers}
              id='numberInput'
              onChange={() => {
                setNumbers((prev) => !prev)
              }}
              className='cursor-pointer'
            />
            <label htmlFor="numberInput">Numbers</label>
            </div>
          <div className='flex items-center gap-x-1'>

            <input
              type="checkbox"
              defaultChecked={characters}
              id='charInput'
              onChange={() => {
                setCharacters((prev) => !prev)
              }}
              className='cursor-pointer'
            />
            <label htmlFor="charInput">Characters</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
