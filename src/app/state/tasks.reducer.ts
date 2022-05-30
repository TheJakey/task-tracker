import { createReducer, on } from '@ngrx/store';
import { addTaskSuccess, deleteTaskSuccess, retrieveTaskListSuccess, updateTaskListError, updateTaskListSuccess, updateTaskSuccess} from './tasks.actions';
import { Task } from '../Task';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
    initialState,
    on(addTaskSuccess, (state, task) => [...state, task]),
    on(updateTaskSuccess, (state, task) => {
        const stateWithoutOldTask = state.filter(oldTask => oldTask.id !== task.id)

        return [...stateWithoutOldTask, task];
    }),
    on(deleteTaskSuccess, (state, taskToDelete) => state.filter(task => task.id !== taskToDelete.id)),
    on(updateTaskListSuccess, (state, { tasks }) => tasks),
    on(updateTaskListError, (state) => [...state]),
    on(retrieveTaskListSuccess, (state, { tasks }) => tasks),
)
