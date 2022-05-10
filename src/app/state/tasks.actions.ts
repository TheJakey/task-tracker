import { createAction, props } from '@ngrx/store';
import { Task } from '../Task';

export const addTask = createAction(
    '[Task List] Add Task',
    props<{task: Task}>()
);

export const updateTask = createAction(
    '[Task List] Update Task',
    props<Task>()
)

export const deleteTask = createAction(
    '[Task List] Delete Task',
    props<Task>()
)

export const retrievedTaskList = createAction(
    '[Task List/API] Retrieve Tasks Success',
    props<{ tasks: ReadonlyArray<Task>}>()
);
