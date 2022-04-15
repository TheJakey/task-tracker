import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @ViewChild(AddTaskComponent)
  private addTaskComponent!: AddTaskComponent;

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private uiService: UiService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  saveTask(task: Task): void {
    if (task.id != null) {
      this.taskService.updateTask(task).subscribe();
    }
    else {
      this.taskService
        .addTask(task)
        .subscribe((savedTask) => this.tasks.push(savedTask));
    }
  }

  toggleEditTask(task: Task): void {
    if (!this.addTaskComponent.showAddTask) {
      this.uiService.toggleAddTask();
    }
    this.addTaskComponent.setTask(task);
  }

  deleteTask(task: Task): void {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();
  }
}
