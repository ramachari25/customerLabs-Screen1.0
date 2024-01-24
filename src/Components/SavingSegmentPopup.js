import React, { useState } from 'react'
import savingSegmentPopupStyles from './savingSegmentPopup.module.scss'
import InputField from '../Utils/InputField'
import DropDown from '../Utils/DropDown'
import { Link } from 'react-router-dom'
import Button from '../Utils/Button'
import { useDispatch } from 'react-redux'
import { saveSegmentsToServer } from '../Redux/SegmentSlicer'
const SavingSegmentPopup = ({setOpenPopup}) => {
  const dispatch=useDispatch()
  const [selectedSegments, setSelectedSegment]=useState([])
  const [selectedSchema,setSelectedSchema]=useState('')
  const [newSegmentName,setNewSegmentName]=useState('')
  const addSchemaOptions=[
    {Label:'First Name',Value:'first_name'},
    {Label: 'Last Name' ,Value: 'last_name'},
    {Label: 'Gender' ,Value: 'gender'},
    { Label: 'Age', Value: 'age'},
    {Label: 'Account Name' ,Value: 'account_name'},
    {Label: 'City' ,Value: 'city'},
    {Label: 'State' , Value: 'state'}
  ]
  const handleChange=(e)=>{
    console.log(e.target.value)
    setSelectedSchema(e.target.value)
  }
  const segmentHandleChange=(e,i)=>{
    const copyOfSelectedSegments=[...selectedSegments]
    copyOfSelectedSegments[i]=e.target.value
    setSelectedSegment(copyOfSelectedSegments)
  }
  const deleteSegmentHandler=(val)=>{
    setSelectedSegment(selectedSegments.filter((value)=>value!=val))
  }
  const schemaAddHandler=()=>{
   if(selectedSchema===''){
    alert("Please select a schema to add")
   }else{
     setSelectedSegment([...selectedSegments,selectedSchema])
     setSelectedSchema('')
    }
  }
  const segmentNameHandler=(e)=>{
    setNewSegmentName(e.target.value)
  }
  const saveSegmentsHandler=()=>{
    if(newSegmentName&&selectedSegments.length>0){
      const schema=(addSchemaOptions.filter((item)=>selectedSegments.includes(item.Value))).reduce((acc,current)=>{
          acc.push({[current.Value] :current.Label})
          return acc
      },[])
      const data={
        "segment_name":newSegmentName,
        "schema":schema
      }
     dispatch(saveSegmentsToServer(data))
    }else if(!newSegmentName){
      alert('Please provide segment name')
    }else if(!selectedSegments.length>0){
      alert('Please select atleast one schema to proceed')
    }

  }
  const closePopupHandler=()=>{
    setOpenPopup(false)
    setSelectedSegment([])
    setSelectedSchema('')
    setNewSegmentName('')
  }
   
  return (
    <div className={savingSegmentPopupStyles.container}>
        <div  className={savingSegmentPopupStyles.container_wrapper}>
        <div className={savingSegmentPopupStyles.container_wrapper_heading}>
          <img className={savingSegmentPopupStyles.container_wrapper_heading_backIcon} src={require('../assets/backArrow.png')} alt='back' title='back' onClick={closePopupHandler}/>
          <h4>Saving Segment</h4>
        </div>
        <div className={savingSegmentPopupStyles.container_wrapper_inputSection}>
        <InputField id={'Enter the Name of the Segment'} style={savingSegmentPopupStyles} placeholder={'Name of the segment'} changeHandler={segmentNameHandler}/>
        <h4>
            To save your segment , you need to add the schemas to build the query
        </h4>
        <div className={savingSegmentPopupStyles.container_wrapper_inputSection_texts}>
            <p>🟢 -user Traits</p>
            <p>🔴 -Group Traits </p>
          
         </div>
         <div className={savingSegmentPopupStyles.container_wrapper_inputSection_segmentContainer}>
          {selectedSegments.length>0&&selectedSegments.map((val,i)=>{
            const segments=selectedSegments.filter((select)=>select!=val)
            const labels=segments.length>0?(addSchemaOptions.filter((item)=>(!segments.includes(item.Value)))).map((name)=>name.Label):(addSchemaOptions.map((label)=>label.Label))
           const values=segments.length>0?(addSchemaOptions.filter((item)=>!segments.includes(item.Value))).map((name)=>name.Value):(addSchemaOptions.map((labelObj)=>labelObj.Value))
           return(
          <div className={savingSegmentPopupStyles.container_wrapper_inputSection_segmentContainer_dropDownWrapper}>
           <DropDown labels={labels} values={values} style={[savingSegmentPopupStyles.container_wrapper_inputSection_segmentContainer_dropDown]} selectedValue={val} handleChange={(e)=>segmentHandleChange(e,i)}/>
           <img  className={savingSegmentPopupStyles.container_wrapper_inputSection_segmentContainer_delImg} src={require('../assets/delete.png')} alt='delete' title='delete' onClick={()=>deleteSegmentHandler(val)}/>
           </div>
           )
          })}
         </div>
         </div>
         <div className={savingSegmentPopupStyles.container_wrapper_inputSection_addNewSec}>
        <DropDown labels={(addSchemaOptions.filter((item)=>!selectedSegments.includes(item.Value))).map((val)=>val.Label)} values={(addSchemaOptions.filter((item)=>!selectedSegments.includes(item.Value))).map((val)=>val.Value)} style={[savingSegmentPopupStyles.container_wrapper_inputSection_addNewSec_dropDown]} selectedValue={selectedSchema} handleChange={handleChange} placeholder={'Add schema to segment'}/>
        <Link onClick={schemaAddHandler}>+Add new schema</Link>
        </div>
       <div className={savingSegmentPopupStyles.container_wrapper_buttonSection}>
            <Button buttons={['Save the Segment','Cancel']} handlers={[saveSegmentsHandler,closePopupHandler]} style={[savingSegmentPopupStyles.container_wrapper_buttonSection_saveBtn,savingSegmentPopupStyles.container_wrapper_buttonSection_cancelBtn]}/>
          </div>
        </div>
        </div>
  )
}
export default SavingSegmentPopup
