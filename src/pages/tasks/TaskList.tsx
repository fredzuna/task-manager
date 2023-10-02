import { useRxData } from "rxdb-hooks";
import { ITask } from "../../interfaces/ITask"
import TaskItem from "./TaskItem"

function TaskList() {
    const { result: tasks } = useRxData<ITask>('tasks', collection => collection.find());

  return (
    <ul>
        {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
        ))}
    </ul>
  )
}

export default TaskList
