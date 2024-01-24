import React from 'react'
const Button = ({buttons=[],handlers=[],style=[]}) => {
  return (
    <>
      {buttons.map((val,i)=><button key={`${val}_${i}`} className={style[i]} onClick={handlers[i]}>{val}</button>)}
    </>
  )
}
export default Button
