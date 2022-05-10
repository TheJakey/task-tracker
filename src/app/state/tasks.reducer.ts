import { createReducer, on } from '@ngrx/store';
import { addTask, deleteTask, retrievedTaskList, updateTask } from './tasks.actions';
import { Task } from '../Task';
import { state } from '@angular/animations';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
    initialState,
    on(retrievedTaskList, (state, { tasks }) => tasks),
    on(addTask, (state, { task }) => [...state, task]),
    on(updateTask, (state, task) => {
        const state_without_old_task = state.filter(old_task => old_task.id !== task.id)

        return [...state_without_old_task, task];
    }),
    on(deleteTask, (state, task_to_delete) => state.filter(task => task.id !== task_to_delete.id))
)
