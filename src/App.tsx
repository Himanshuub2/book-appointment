import React, { useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import "./index.css"
import ViewAppointments from './components/ViewAppointments';
import NewAppointment from './components/NewAppointment';



const initialAppointments:Array <any>  = [
  {  startTime: '10:00', endTime: '10:30', date: "2023-06-04" },
  {  startTime: '14:30', endTime: '15:00', date: "2023-06-05" },
  {  startTime: '09:00', endTime: '09:30', date: "2023-06-06" },
];


function App() {
const scheduledAppointments = localStorage.getItem("scheduledAppointments")
const parseAppoitments =scheduledAppointments ? JSON.parse(scheduledAppointments): null

  const [appointments,setAppointments] =useState<object []>(parseAppoitments|| initialAppointments )
  const [showAppointment,setShowAppointment] = useState<boolean>(false)
  const [newAppointment,setNewAppointment] = useState<boolean>(false)

  const handleShowAppointment = ()=>{
    setShowAppointment(!showAppointment)
    setNewAppointment(false)
  }
  const handleNewAppointment = ()=>{
    setShowAppointment(false)
    setNewAppointment(!newAppointment)
  }
  return(
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl text-blue-400 text-center'>Scheduler</h1>
      <div className='w-3/4 h-48  flex flex-row justify-around items-center'>
        <button className='bg-blue-800 text-white p-4 rounded-lg font-medium' 
        onClick={handleShowAppointment}
        >View Appointments
        </button>


        <button className='bg-green-800 p-4 text-white font-medium rounded-lg ' 
        onClick={handleNewAppointment}
        >New Appointment +
        </button>
       

      </div>
      {
          showAppointment &&
          <ViewAppointments appointments = {appointments}/>
        }
      {
        newAppointment &&
        <NewAppointment setAppointments={setAppointments} appointments={appointments}/>
      }
    </div>
  )
}

export default App;