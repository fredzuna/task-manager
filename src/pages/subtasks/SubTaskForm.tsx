import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ESubTaskStatus } from "../../enums/EStatus";
import { useRxCollection, useRxQuery } from "rxdb-hooks";
import { ITask } from "../../interfaces/ITask";
import { generate } from "shortid";
import { ISubTask } from "../../interfaces/ISubTask";

function SubTaskForm() {
    const { taskId, subtaskId } = useParams();

    const taskCollection = useRxCollection<ITask>('tasks');
    const subTaskCollection = useRxCollection<ISubTask>('subtasks');

    const query = taskId ? taskCollection?.findOne(taskId) : undefined;
    const { result: task } = useRxQuery<ITask>(query);     

    const querySubTask = subtaskId ? subTaskCollection?.findOne(subtaskId): undefined;
    const { result: subTaskEdit } = useRxQuery<ISubTask>(querySubTask);

    const [taskSelected, setTaskSelected] = useState<ITask>();

    const [name, setName] = useState('');
    const [state, setState] = useState<ESubTaskStatus>();
    const [comment, setComment] = useState('');    

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    }

    const statusList = Object.keys(ESubTaskStatus);

    const handleSave = () => {
        if(taskSelected && name && state && comment) {
            const newSubTask: ISubTask = {
                id: subtaskId || generate(),
                name,
                status: state,
                comment: comment
            }

            let newSubTasks: ISubTask[] = taskSelected?.subTasks || [];
            newSubTasks = newSubTasks.filter(item => item.id !== newSubTask.id)
            newSubTasks = [...newSubTasks, newSubTask]

            subTaskCollection?.incrementalUpsert(newSubTask)

            const markerValue = taskSelected.marker ? { top: taskSelected.marker.top, left: taskSelected.marker.left }: undefined;

            taskCollection?.incrementalUpsert({
                id: taskSelected.id,
                name: taskSelected.name,
                status: taskSelected.status,
                description: taskSelected.description,
                subTasks: newSubTasks,
                marker: markerValue
            });
            
            navigate(-1);
        }
    }

    useEffect(() => {
        if(task && task[0]) {
            setTaskSelected(task[0])
        }
    }, [task])

    useEffect(() => {
        if(subTaskEdit && subTaskEdit[0]) {
            setName(subTaskEdit[0].name)
            setState(subTaskEdit[0].status)
            setComment(subTaskEdit[0].comment)
        }
    }, [subTaskEdit])

  return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="pb-4 font-bold ">{subtaskId ? "Edit" : "Create"} New Item</p>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name Item
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                    comment
                </label>
                <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="comment" 
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                />
            </div>            

            <div className="w-full mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="task">
                    Task
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="task" 
                    type="text" 
                    readOnly
                    value={taskSelected?.name}
                />
            </div>

            <div className="w-full mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                    State
                </label>
                <div className="relative">
                    <select 
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="state"
                        onChange={(e) => {
                            setState(e.target.value)
                        }}
                        value={state}                            
                    >
                        <option>--Select--</option>
                        {statusList.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
  

            <div className="flex items-center justify-between">
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button"
                onClick={handleSave}
            >
                Save
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleCancel} href="#">
                Cancel
            </a>
            </div>
        </form>
    </div>
  )
}

export default SubTaskForm