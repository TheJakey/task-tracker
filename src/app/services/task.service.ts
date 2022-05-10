import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task';
import { delay, Observable, timer } from 'rxjs';

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

  updateAllTasks(tasks: Task[]): void {
    // json-server used as BE currently doesn't support BULK update, so had to come up with a workaround
    const url = `${this.apiUrl}/`;

    // Ugly "sleep" here which makes sure each itteration has 200ms between them otherwise json-server was failing
    // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
    for (const task of tasks) {
      setTimeout(() => {
        this.httpClient.put<Task>(url + task.id, task, httpOptions).subscribe();
      }, task.order * 200);
    }
  }
}
