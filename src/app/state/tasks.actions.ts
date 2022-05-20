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
