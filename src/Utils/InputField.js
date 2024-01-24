import React from 'react'
const InputField = ({id,name,changeHandler,style,placeholder}) => {
  return (
    <div className={style?.inputFieldDiv}>
        <label htmlFor={id}>{id}</label>
        <input className={style.inputFieldDiv_inputField}  id={id} name={name} onChange={changeHandler}
        placeholder={placeholder}
        />
    </div>
  )
}

export default InputField
