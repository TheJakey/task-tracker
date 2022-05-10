import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Observable } from 'rxjs';
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

  tasks$: Observable<readonly Task[]> = this.store.select(selectTasks);

  constructor(
    private taskService: TaskService,
    private uiService: UiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.taskService
      .getTasksNgrx()
      .subscribe((tasks) => this.store.dispatch(retrievedTaskList({ tasks })));
  }

  saveTask(task_readonly: Task): void {
    let task: Task = JSON.parse(JSON.stringify(task_readonly));

    if (task.id != null) {
      this.store.dispatch(updateTask(task));

      this.taskService.updateTask(task).subscribe();
    } else {
      // hmm this is weird
      let last_order: number = -1;
      this.tasks$.subscribe((tasks) => {
        last_order = Math.max(...tasks.map((task) => task.order)) + 1;
      });
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

  drop(event: CdkDragDrop<Observable<ReadonlyArray<Task>>>) {
    console.log('Before');
    console.log(event);

    event.container.data.subscribe((tasks_obs) => {
      let tasks: Task[] = [...tasks_obs];

      if (event.previousContainer === event.container) {
        moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      } else {
        event.previousContainer.data.subscribe((previousTasks_obs) => {
          let previousTasks: Task[] = [...previousTasks_obs];
          transferArrayItem(
            [...previousTasks],
            tasks,
            event.previousIndex,
            event.currentIndex
          );
          //if transfer, recalculate the order of previous (the list from drag)
          previousTasks.forEach((x, index) => {
            x.order = index;
          });
        });
      }
      //always, recalculate the order of the container (the list to drag)
      let reordered_tasks: Array<Task> = [];
      tasks.forEach((read_only_task, index) => {
        let task: Task = JSON.parse(JSON.stringify(read_only_task));
        task.order = index;

        reordered_tasks.push(task);
      });

      this.taskService.updateAllTasks(reordered_tasks);
    });
  }
}
