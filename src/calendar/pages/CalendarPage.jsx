import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getCalendarMessages, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPage = () => {

  const {user} = useAuthStore();
  const {openDateModal} = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const [lastview, setLastView] = useState(localStorage.getItem('lastView')||'week');

  const eventStyleGetter=(event, start, end, isSelected)=>{
    const isMyEvent = (user.uidd === event.user._id)||(user.uidd === event.user.uid)
    
    const style = {
    backgroundColor: isMyEvent? '#f134f7' : '#465660',
    borderRadius:'0px',
    opacity:'0.8',
    color:'white'
    };
  
  return{
    style
  }
};

  const onDoubleClick = (event)=>{
    openDateModal();
  }

  const onSelect = (event)=>{
    setActiveEvent(event);
  }

  const onViewChange = (event)=>{
    localStorage.setItem('lastView', event)
  }

  useEffect(()=>{
    startLoadingEvents();
  },[])

  return (
    <>
    <NavBar/>

    <Calendar
    culture='es'
    localizer={localizer}
    events={events}
    defaultView={lastview}
    startAccessor="start"
    endAccessor="end"
    style={{ height:'calc( 100vh - 80px)' }}
    messages={getCalendarMessages()}
    eventPropGetter={eventStyleGetter}
    components={{
      event: CalendarEvent
    }}
    onDoubleClickEvent={onDoubleClick}
    onSelectEvent={onSelect}
    onView={onViewChange}
  />

  <CalendarModal/>
  <FabAddNew/>
  <FabDelete/>
  </>
  )
}
