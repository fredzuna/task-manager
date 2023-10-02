import { useEffect, useState } from 'react';
import { Container } from '../containers/Container';
import ImageMarker, { Marker } from 'react-image-marker';
import HomeDesign from '../../assets/HomeDesign.svg';
import { useNavigate } from 'react-router-dom';
import { useRxData } from 'rxdb-hooks';
import { ITask } from '../../interfaces/ITask';
import MarkerStatusIcon from './MarkerStatusIcon';
import { TooltipMarker } from './TooltipMarker';

function TaskMarker() {
  const navigate = useNavigate();
  const { result: tasks } = useRxData<ITask>('tasks', collection => collection.find());  

  const [markers, setMarkers] = useState([])  

  const handleAddMarker = (marker: Marker) => {
    navigate('/taskForm', { state: { ...marker }});
  }

  useEffect(() => {
    if(tasks.length > 0) {
      const markerData = tasks.filter(item => item?.marker !== undefined).map(item => ({...item.marker, ...item._data}))
      setMarkers(markerData)
    }

  }, [tasks])


  return (
    <Container>
      <p className="font-bold text-center text-orange-500">Click on image to create a task </p>
      <ImageMarker
        src={HomeDesign}
        markers={markers}
        onAddMarker={handleAddMarker}
        markerComponent={CustomMarker}
    />
    </Container>
  )
}

export default TaskMarker

function CustomMarker(props: any) {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  const handleMarker = () => {
      navigate('/taskDetail/'+props.id);
  }

  return (
    <div 
      className='flex flex-col cursor-pointer' 
      onClick={handleMarker}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {isShown && <TooltipMarker text={props.name} />}
      <span className='text-center text-[11px] font-bold absolute top-1 left-2 text-white'>{props.name.slice(0, 2).toUpperCase()}</span>      
      <MarkerStatusIcon className={`marker-${props.status}`}/>
    </div>
  )
}