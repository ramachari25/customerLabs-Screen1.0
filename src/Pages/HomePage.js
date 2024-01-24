import React, { useState } from 'react'
import homePageStyles from './home.module.scss'
import Button from '../Utils/Button'
import SavingSegmentPopup from '../Components/SavingSegmentPopup'
const HomePage = () => {
  const [openPopup,setOpenPopup]=useState(false)
  const handleClick=()=>{
   setOpenPopup(true)
  }
  return (
    <div className={homePageStyles.container}>
        {openPopup?<SavingSegmentPopup setOpenPopup={setOpenPopup}/>:null}
        <Button buttons={['Save segment']} handlers={[handleClick]} style={[homePageStyles.container_btn]}/>
    </div>
  )
}

export default HomePage
