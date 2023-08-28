import React, { useEffect, useState } from 'react'
import CardTransport from '../CardTransport/CardTransport'
import SearchComponent from '../SearchComponent/SearchComponent'

export default function Cards({transportCategory,setListOfTransport,listOfTransport}) {
  const [filtered,setOfFiltered]=useState([])
  useEffect(()=>{
        setOfFiltered(transportCategory)
  },[])
  return (
    <>
    <SearchComponent setListofTransport={setOfFiltered}transportCategory={transportCategory}/>
          {
                  filtered.map((e,i)=>{
                        return <CardTransport  listOfTransport={listOfTransport} key={e.id} transport={e}  setListOfTransport={setListOfTransport} setFiltered={setOfFiltered} filtered={filtered}/>
                    })
                }
    </>
  )
}
