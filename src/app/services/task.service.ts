import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task';
import { delay, Observable, of, throwError, timer } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
  }

  getTasksNgrx(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(this.apiUrl);
  } 

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.apiUrl, task, httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.httpClient.delete<Task>(url);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.httpClient.put<Task>(url, task, httpOptions);
  }

  updateAllTasks(tasks: Task[]): Observable<Task[]> {
    const url = `${this.apiUrl}/`;

    // json-server used as BE currently doesn't support BULK update, so had to come up with a workaround
    for (const task of tasks) {
      var request = new XMLHttpRequest();

      try {
        request.open('PUT', url + task.id, false);  
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(task));

        if (request.status != 200) {
          return throwError(() => new Error("HTTP status: " + request.status))
        }
      }
      catch(e: unknown) {
        return throwError(() => e);
      }
    }
    

    return of(tasks);
  }
}
