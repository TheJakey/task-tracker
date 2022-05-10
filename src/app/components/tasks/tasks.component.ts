import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { filter, Observable } from 'rxjs';
import { AddTaskComponent } from '../add-task/add-task.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import {
  addTask,
  deleteTask,
  retrievedTaskList,
  updateTask,
} from 'src/app/state/tasks.actions';
import { selectTasks } from 'src/app/state/tasks.selectors';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @ViewChild(AddTaskComponent)
  private addTaskComponent!: AddTaskComponent;

  tasks: ReadonlyArray<Task> = [];

  constructor(
    private taskService: TaskService,
    private uiService: UiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.taskService
      .getTasksNgrx()
      .subscribe((tasks) => this.store.dispatch(retrievedTaskList({ tasks })));
    
    this.store.select(selectTasks).subscribe(selected_tasks => this.tasks = selected_tasks);
  }

  saveTask(taskReadOnly: Task): void {
    let task: Task = JSON.parse(JSON.stringify(taskReadOnly));

    if (task.id != null) {
      this.store.dispatch(updateTask(task));

      this.taskService.updateTask(task).subscribe();
    } else {
      let last_order: number = Math.max(...this.tasks.map((task) => task.order)) + 1;
      task.order = last_order !== undefined ? last_order : 0;

      this.store.dispatch(addTask({ task }));

      this.taskService.addTask(task).subscribe();
    }
  }

  toggleEditTask(task: Task): void {
    if (!this.addTaskComponent.showAddTask) {
      this.uiService.toggleAddTask();
    }
    this.addTaskComponent.setTask(task);
  }

  deleteTask(task: Task): void {
    this.store.dispatch(deleteTask(task));
    this.taskService.deleteTask(task).subscribe();
  }

  toggleReminder(task: Task): void {
    task = JSON.parse(JSON.stringify(task));
    task.reminder = !task.reminder;
    
    this.store.dispatch(updateTask(task));
    this.taskService.updateTask(task).subscribe();
  }

  drop(event: CdkDragDrop<ReadonlyArray<Task>>) {
    let data = [...event.container.data];
    let previousData = [...event.container.data];
    
    if (event.previousContainer === event.container) {
      moveItemInArray(
        data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        previousData,
        data,
        event.previousIndex,
        event.currentIndex
      );
      //if transfer, recalculate the order of previous (the list from drag)
      event.previousContainer.data.forEach((x, index) => {
        x.order = index;
      });
    }
    //always, recalculate the order of the container (the list to drag)
    data = data.map((readOnlyTask, index) => {
      let task = JSON.parse(JSON.stringify(readOnlyTask));
      task.order = index;
      return task;
    });

    this.taskService.updateAllTasks(data);

    this.store.dispatch(retrievedTaskList({tasks: data}));
  }
}
