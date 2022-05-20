import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {TaskService} from "../services/task.service";
import {catchError, EMPTY, map, mergeMap, Observable, of} from "rxjs";
import {retrieveTaskList, retrieveTaskListSuccess, updateTaskList, updateTaskListSuccess, updateTaskListError, retrieveTaskListError} from "./tasks.actions";

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveTaskList),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => retrieveTaskListSuccess({ tasks })),
          catchError((error) => {
            console.log("Error loading Tasks", error);
            return of(retrieveTaskListError());
          }),
        )
      ),
    )
  );

  updateTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskList),
      mergeMap((tasks) => 
        this.taskService.updateAllTasks(tasks.tasks).pipe(
          map((tasks) => updateTaskListSuccess({tasks})),
          catchError((error) => {
            console.log(error);
            return of(updateTaskListError());
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}

}
