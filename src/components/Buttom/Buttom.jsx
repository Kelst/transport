import React from 'react'

export default function Buttom({text}) {
  return ( <button type="button"  className="bg-gradient-to-r from-blue-100 to-blue-500 hover:from-blue-500 hover:to-blue-100  rounded-2xl p-2">
    {text}
  </button>
  )
}
