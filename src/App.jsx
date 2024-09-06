import React from 'react'
import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) char += "0123456789"
    if (charAllowed) char += "!@#$%^&*()+={}[]"
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor((Math.random() * char.length) + 1)
      pass += char.charAt(charIndex)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <div className='h-auto w-full max-w-lg mx-auto px-6 py-4 mt-28 bg-[#212121] text-orange-600 shadow-lg rounded-xl  '>
      <h1 className=' text-3xl text-center'>Password Generator</h1>
      <div className=' flex shadow rounded-lg overflow-hidden my-8 text-[24px]'>
        <input
          type="text"
          className=' w-full px-3 py-1 outline-none'
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button className=' bg-blue-700 hover:bg-blue-600 outline-none px-3 py-1 text-white text-lg font-semibold' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className=' flex justify-between text-lg'>
        <label className=' flex gap-x-1 items-center'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className=' cursor-pointer'
          />length: {length}</label>

        <label className=' flex gap-x-1 items-center' htmlFor='inputNumber'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            id='inputNumber'
          />Number</label>

        <label className=' flex gap-x-1 items-center' htmlFor='inputChar'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            id='inputChar'
          />Character</label>
      </div>
    </div>
  )
}

export default App