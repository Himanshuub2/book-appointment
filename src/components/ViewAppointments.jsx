import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';



const ViewAppointments = ({appointments})=>{

    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  
    const formatTwoDigits = (value) => {
      return value < 10 ? `0${value}`.toString() : value.toString();
    };
  
    const dayFormat = (locale,date) => {
      return formatTwoDigits(date.getDate());
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const tileContent = ({ date }) => {
      // console.log(appointments[0].date.split("-")[2])
      // console.log(formatTwoDigits(date.getDate()))
     const filteredArray = appointments.filter(item=>item.date.split("-")[2]+"/"+item.date.split("-")[1]===formatTwoDigits(date.getDate())+"/"+formatTwoDigits(date.getMonth()))
     
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
              formatDay={dayFormat}
            />
          </div>
        </div>
      </div>
    );
  
  }

  export default ViewAppointments;