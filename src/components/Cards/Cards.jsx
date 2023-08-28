import React, { useEffect, useState } from 'react'
import CardTransport from '../CardTransport/CardTransport'
import SearchComponent from '../SearchComponent/SearchComponent'
import ModalAddTransport from '../Modal/ModalAddTransport'

export default function Cards({transportName,transportCategory,setListOfTransport,listOfTransport}) {
  const [filtered,setOfFiltered]=useState([])
  useEffect(()=>{
        setOfFiltered(transportCategory)
  },[])
  return (
    <>
    <div className='flex justify-between'>
      <div></div>
    <ModalAddTransport transportName={transportName} 
    listOfTransport={listOfTransport}
     setListOfTransport={setListOfTransport}
      filtered={filtered} 
      setOfFiltered={setOfFiltered}
      />
    </div>
     

    <SearchComponent setListofTransport={setOfFiltered}transportCategory={transportCategory}/>
          {
                  filtered.map((e,i)=>{
                        return <CardTransport  listOfTransport={listOfTransport} key={e.id} transport={e}  setListOfTransport={setListOfTransport} setFiltered={setOfFiltered} filtered={filtered}/>
                    })
                }
    </>
  )
}
