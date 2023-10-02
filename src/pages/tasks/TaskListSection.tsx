import { Container } from '../containers/Container';
import { ButtonTask } from './ButtonTask';
import TaskList from './TaskList';

function TaskListSection() {
  return (
    <Container footer={<ButtonTask text='Add task' pathRedirect='/taskForm' />}>
      <TaskList />
    </Container>
  )
}

export default TaskListSection