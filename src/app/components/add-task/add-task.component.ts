import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onSaveTask: EventEmitter<Task> = new EventEmitter();
  private task: Task | null = null;
  text!: string;
  day!: Date | null;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = uiService.onToggle().subscribe((newShowAddTask) => {
      this.showAddTask = newShowAddTask;
      if (!this.showAddTask) {
        this.clearFields();
      }
    });
  }

  ngOnInit(): void {}

  setTask(task: Task) {
    this.task = task;

    if (task != null) {
      this.text = task.text;
      this.day = task.day;
      this.reminder = task.reminder;
    }
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    if (this.task == null) {
      this.createNewTask();
    } else {
      this.updateTask(this.task);
    }
  }

  createNewTask() {
    const newTask = this.updateTaskFromInputs(<Task>{});

    this.onSaveTask.emit(newTask);

    this.clearFields();
  }

  updateTask(task: Task) {
    this.onSaveTask.emit(this.updateTaskFromInputs(task));
  }

  private clearFields() {
    this.task = null;
    this.text = '';
    this.day = null;
    this.reminder = false;
  }
  
  updateTaskFromInputs(task: Task) {
    task.text = this.text;
    task.day = this.day;
    task.reminder = this.reminder;

    return task;
  }
}
