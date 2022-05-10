import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "../Task";
export const selectTasks = createFeatureSelector<ReadonlyArray<Task>>('tasks');

export const selectTaskCollection = createSelector(
    selectTasks,
    (tasks) => tasks
);