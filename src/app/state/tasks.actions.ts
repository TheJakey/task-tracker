import { createAction, props } from '@ngrx/store';
import { Task } from '../Task';

export const addTask = createAction(
    '[Task List] Add Task',
    props<Task>()
);

export const addTaskSuccess = createAction(
    '[Task List] Add Task Success',
    props<Task>()
);

export const addTaskError = createAction(
    '[Task List] Add Task Error',
);

export const updateTask = createAction(
    '[Task List] Update Task',
    props<Task>()
)

export const updateTaskSuccess = createAction(
    '[Task List] Update Task Success',
    props<Task>()
)

export const updateTaskError = createAction(
    '[Task List] Update Task Error',
)

export const updateTaskList = createAction(
    '[Task List/API] Update Tasks',
    props<{ tasks: Array<Task> }>()
)

export const updateTaskListSuccess = createAction(
    '[Task List/API] Update Tasks Success',
    props<{ tasks: Array<Task> }>()
)

export const updateTaskListError = createAction(
    '[Task List/API] Update Tasks Error',
)

export const deleteTask = createAction(
    '[Task List] Delete Task',
    props<Task>()
)

export const deleteTaskSuccess = createAction(
    '[Task List] Delete Task Success',
    props<Task>()
)

export const deleteTaskError = createAction(
    '[Task List] Delete Task Error',
)

export const retrieveTaskList = createAction(
    '[Task List/API] Retrieve Tasks'
);

export const retrieveTaskListSuccess = createAction(
    '[Task List/API] Retrieve Tasks Success',
    props<{ tasks: ReadonlyArray<Task>}>()
);

export const retrieveTaskListError = createAction(
    '[Task List/API] Retrieve Tasks Error',
);
