import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onSaveTask: EventEmitter<Task> = new EventEmitter<Task>();
  private task: Task | null = null;
  text!: string;
  day!: Date | null;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private store: Store) {
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
      this.onSaveTask.emit(this.updateTaskFromInputs({...this.task}));
    }
  }

  createNewTask() {
    const newTask = this.updateTaskFromInputs(<Task>{});

    this.onSaveTask.emit(newTask);

    this.clearFields();
  }

  private clearFields() {
    this.task = null;
    this.text = '';
    this.day = null;
    this.reminder = false;
  }
  
  updateTaskFromInputs(task: Task): Task {
    task.text = this.text;
    task.day = this.day;
    task.reminder = this.reminder;

    return task;
  }
}
