import { ITask } from "../../interfaces/ITask"
import SubTaskItem from "../subtasks/SubTaskItem"
import DownArrowIcon from '../../assets/DownArrowIcon.svg';
import UpArrowIcon from '../../assets/UpArrowIcon.svg';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  task: ITask
}

function TaskDetail({ task } : IProps) {
  const [open, setOpen] = useState(false);  
  const navigate = useNavigate();

  const handleToogle = () => {
    setOpen(!open)
  }

  const handleSubTask = () => {
    navigate(`/taskDetail/${task.id}`);
  }  

  return (
    <div>
      <div className="border-b border-[#E1E3E5]">
        <div onClick={handleSubTask} className="mx-4 cursor-pointer">
          <p className="font-bold text-xl ">{task.name}</p>
          <div className="flex items-center mb-4">
            <span className="blocked-circle"></span>
            <span className="text-xs ml-2 font-sans text-red-600">{task.description}</span>
          </div>
        </div>
      </div>
        <div>
          {task.subTasks && 
            <div className="pt-4 pb-4 text-lg font-bold flex mx-4 cursor-pointer" onClick={handleToogle}>
              <span className="grow">Checklist</span>
              <img src={open ? UpArrowIcon : DownArrowIcon} />
            </div>
          }
          {open && <>
              <div className="border-b border-t border-[#E1E3E5] pt-4 pb-4">
                  <div className="mx-4 flex">
                    <span className="w-[30px] h-[30px] text-xs text-white bg-[#062A4F] font-bold rounded-lg flex items-center justify-center">CI</span>
                    <span className="grow ml-4">{task.description}</span>
                    <span className="text-[#8D9196]">{task.subTasks?.length} STEPS</span>
                  </div>
              </div>
              <ul className="mx-4">
                {task.subTasks?.map(item => (
                  <SubTaskItem key={item.id} taskId={task.id} subTask={item}/>
                ))}
              </ul>
            </>
          }
        </div>        
    </div>
  )
}

export default TaskDetail
