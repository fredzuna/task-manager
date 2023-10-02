import { useParams } from 'react-router-dom';
import { Container } from '../containers/Container';
import { ButtonTask } from './ButtonTask';
import { useRxCollection, useRxQuery } from 'rxdb-hooks';
import { ITask } from '../../interfaces/ITask';
import TaskDetail from './TaskDetail';

function TaskDetailSection() {
  const { id } = useParams();

  const collection = useRxCollection<ITask>('tasks');
  const query = id ? collection?.findOne(id) : undefined;
  const { result: taskDetail } = useRxQuery<ITask>(query);

  const data = taskDetail[0];  

  return (
    <Container footer={<ButtonTask text='Add item' pathRedirect={`/subtaskForm/${id}`} />}>
      {data && <TaskDetail task={data} />}
    </Container>
  )
}

export default TaskDetailSection