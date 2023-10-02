import { useNavigate } from "react-router-dom";
import { ISubTask } from "../../interfaces/ISubTask"
import { getSubTaskStateInfo } from "../utils/Common"

interface IProps {
  subTask: ISubTask,
  taskId: string
}

function SubTaskItem({ subTask, taskId } : IProps) {  
  const stateInfo = getSubTaskStateInfo(subTask.status)
  const navigate = useNavigate();

  const handleEditSubTask = () => {
    navigate(`/subtaskForm/${taskId}/${subTask.id}`);
  }

  return (
    <li className={`flex mt-4 mb-4 items-center cursor-pointer ${stateInfo.className}`} onClick={handleEditSubTask} >
        <img src={stateInfo.icon} alt={subTask.name}/>
        <div className="ml-4">
          <p className="text-base text-[#0C0D0D] leading-6 sub-task-name">{subTask.name}</p>
          <p className={`flex items-center`}>
            <span className="state-circle"></span>  
            <span className="state-text">{subTask.status} {subTask.comment}</span>
          </p>
        </div>
    </li>
  )
}

export default SubTaskItem