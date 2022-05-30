import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {TaskService} from "../services/task.service";
import {catchError, EMPTY, map, mergeMap, Observable, of} from "rxjs";
import {retrieveTaskList, retrieveTaskListSuccess, updateTaskList, updateTaskListSuccess, updateTaskListError, retrieveTaskListError, updateTask, updateTaskSuccess, updateTaskError, addTaskError, addTaskSuccess, addTask, deleteTask, deleteTaskError, deleteTaskSuccess} from "./tasks.actions";

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveTaskList),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => retrieveTaskListSuccess({ tasks })),
          catchError((error) => {
            console.log("Error loading Tasks: ", error);
            return of(retrieveTaskListError());
          }),
        )
      ),
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      mergeMap((task) => 
        this.taskService.addTask(task).pipe(
          map((task) => addTaskSuccess(task)),
          catchError((error) => {
            console.log("Error during task creation: ", error);
            return of(addTaskError());
          })
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      mergeMap((task) => 
        this.taskService.updateTask(task).pipe(
          map((task) => updateTaskSuccess(task)),
          catchError((error) => {
            console.log("Error during task update: ", error);
            return of(updateTaskError());
          })
        )
      )
    )
  );

  updateTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskList),
      mergeMap((tasks) => 
        this.taskService.updateAllTasks(tasks.tasks).pipe(
          map((tasks) => updateTaskListSuccess({tasks})),
          catchError((error) => {
            console.log("Error during tasks update: ", error);
            return of(updateTaskListError());
          })
        )
      )
    )
  );
  
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      mergeMap((task) => 
        this.taskService.deleteTask(task).pipe(
          map((task) => deleteTaskSuccess(task)),
          catchError((error) => {
            console.log("Error during task delete: ", error);
            return of(deleteTaskError());
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}

}
