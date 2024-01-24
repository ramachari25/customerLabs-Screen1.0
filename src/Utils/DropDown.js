import React from 'react'
const DropDown = ({labels=[],values=[],style=[],placeholder,selectedValue,handleChange}) => {
  return (
    <>
      <select className={style} value={selectedValue} onChange={(e)=>handleChange(e)}>
        <>
        {placeholder? <option value='' disabled >{placeholder}</option>:null}
        {values.map((val,i)=><option key={`${val}_${i}`} value={val}>{labels[i]?labels[i]:val}</option>)}
        </>
       </select>
    </>
  )
}

export default DropDown
