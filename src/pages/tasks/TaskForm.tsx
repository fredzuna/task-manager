import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRxCollection, useRxQuery } from "rxdb-hooks";
import { useParams } from 'react-router';
import { ETaskStatus } from "../../enums/ETaskStatus";
import { generate } from 'shortid';
import { ITask } from "../../interfaces/ITask";

function TaskForm() {
    const { id } = useParams();
    const { state } = useLocation();
    
    const collection = useRxCollection<ITask>('tasks');
    const query = id ? collection?.findOne(id) : undefined;
    const { result: taskEdit } = useRxQuery<ITask>(query);

    const [name, setName] = useState('');
    const [status, setStatus] = useState<ETaskStatus>();
    const [description, setDescription] = useState('');
    

    const navigate = useNavigate();
    const statusList = Object.keys(ETaskStatus);

    const handleCancel = () => {
        navigate(-1);
    }

    const handleSave = () => {
        if(!name || !status || !description) {
            return;
        }

        const markerValue = state ? { top: state.top, left: state.left }: undefined;

        if(id) {
            collection?.upsert({
                id,
                name,
                status,
                description,
            });
        }else {
            collection?.insert({
                id: generate(),
                name,
                status,
                description,
                marker: markerValue
            });
        }

        navigate(-1);
    }

    useEffect(() => {
        if(taskEdit && taskEdit[0]) {
            setName(taskEdit[0].name)
            setStatus(taskEdit[0].status)
            setDescription(taskEdit[0].description)
        }
    }, [taskEdit])


  return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="pb-4 font-bold ">Create New Task</p>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Task name
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="description" 
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
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
                            setStatus(e.target.value)
                        }}
                        value={status}
                    >
                        <option value="">--Select--</option>
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

export default TaskForm