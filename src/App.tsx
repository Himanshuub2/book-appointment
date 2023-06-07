import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import "./index.css"

const initialAppointments:Array <any>  = [
  {  startTime: '10:00', endTime: '10:30', date: "2023-06-04" },
  {  startTime: '14:30', endTime: '15:00', date: "2023-06-05" },
  {  startTime: '09:00', endTime: '09:30', date: "2023-06-06" },
];

function App() {
  const [appointments,setAppointments] =useState<object []>(initialAppointments)
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

// ///////////////////////////////////////

const ViewAppointments = ({appointments})=>{

  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date }) => {
    console.log(appointments[0].date.split("-")[2])
    console.log(date.getDate())
   const filteredArray = appointments.filter(item=>item.date.split("-")[2]+"/"+item.date.split("-")[1]===date.getDate()+"/"+date.getMonth())
   
   if(filteredArray.length>0){
    console.log(filteredArray)
    return <div style={{backgroundColor:"red",width:"8px",height:"10px"}}></div>
   }
  };

  return (
    <div className="App">
      <h1 className='text-center text-2xl py-4'>Scheduled Appointments</h1>
      <div className="flex flex-row justify-center items-start gap-12 ">
        <div className="list-view">
          <h2 className='text-center text-2xl font-bold'>List View</h2>
          
          <select>
          {
            appointments.map(item=>(
              <option value = {(item.startTime)+"-"+(item.endTime)}>{(item.startTime)+"-"+(item.endTime)+"   "+(item.date.split("-")[2]+"/"+item.date.split("-")[1])}</option>
            ))
          }
          </select>
        </div>
        <div className="calendar-view">
          <h2 className='text-center text-2xl font-bold'>Calendar View</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={(date)=>tileContent(date)}
          />
        </div>
      </div>
    </div>
  );

}




const NewAppointment = ({setAppointments,appointments})=>{
    const[dateTime,setDateTime] = useState({startTime:"",endTime:"",date:""})

  const handleChange = (e)=>{
    setDateTime({...dateTime,[e.target.name]:e.target.value})
    setAppointments([...appointments,dateTime])

  }
  const checkAvailibility = (e)=>{

    console.log(appointments)

  }

  return(
    <div className='flex flex-col gap-2'>
      Date:<input type = "date" name = "date" className='border-2 border-black' onChange = {handleChange}/>
      Start<input type = "time" name = "startTime" className='border-2 border-black' onChange = {handleChange}/>
      End<input type = "time" name = "endTime" className='border-2 border-black' onChange = {handleChange}/>
      <button className = "p-1 text-white bg-red-400"onClick = {checkAvailibility}>Check Availibility</button>

    </div>
  )
}