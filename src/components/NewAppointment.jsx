import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import PropTypes from "prop-types"

const NewAppointment = ({setAppointments,appointments})=>{
    const[dateTime,setDateTime] = useState({startTime:"",endTime:"",date:""})
    const [validAppointment,setValidAppointment] = useState(false);
    const [inValidAppointment,setInvalidAppointment] = useState(false);

  const handleChange = (e)=>{
    const updatedDateTime = {...dateTime,[e.target.name]:e.target.value}
    setDateTime(updatedDateTime)
  }
 
  const checkAvailibility = ()=>{
    const isAvailable = appointments.filter(appoint=>appoint.startTime.split("-")[0] === dateTime.startTime.split("-")[0])
    if (isAvailable.length>0)  setInvalidAppointment(true)
    else setValidAppointment(true)
    if(dateTime.date && dateTime.startTime && dateTime.endTime){
      setAppointments([...appointments,dateTime])
    }
    localStorage.setItem("scheduledAppointments",JSON.stringify(appointments))
  }
  console.log(appointments)

  return(
    <div className='flex flex-col gap-2'>
      Date:<input type = "date" name = "date" className='border-2 border-black' onChange = {(e)=>handleChange(e)}/>
      Start<input type = "time" name = "startTime" className='border-2 border-black' onChange = {(e)=>handleChange(e)}/>
      End<input type = "time" name = "endTime" className='border-2 border-black' onChange = {(e)=>handleChange(e)}/>
      <button className = "p-1 text-white bg-red-400"onClick = {()=>checkAvailibility()}>Check Availibility</button>
      {

        validAppointment && <div className='text-2xl text-green-600 '>Appointment Booked Successfully</div>
      }{
        inValidAppointment && <div className='text-2xl text-red-600'>Appointment not available at this time</div>
      }

    </div>
  )
}

NewAppointment.propTypes = {
  setAppointments: PropTypes.func.isRequired,
  appointments: PropTypes.array.isRequired,
};

export default NewAppointment;