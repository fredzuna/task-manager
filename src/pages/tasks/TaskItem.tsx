import { ITask } from "../../interfaces/ITask"
import { useNavigate } from "react-router-dom";

interface IProps {
  task: ITask
}

function TaskItem({ task } : IProps) {
  const navigate = useNavigate();

  const handleTaskDetail = () => {
    navigate(`/taskDetail/${task.id}`);
  }

  return (
    <li>
      <div className="border-b border-[#E1E3E5]">
        <div onClick={handleTaskDetail} className="mx-4 cursor-pointer">
          <p className="font-bold text-xl ">{task.name}</p>
          <div className="flex items-center mb-4">
            <span className={`blocked-circle task-${task.status}`}></span>
            <span className="text-xs ml-2 font-sans text-red-600">{task.description}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TaskItem
