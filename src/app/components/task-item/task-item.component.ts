import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes
  faPenToSquare = faPenToSquare
  
  constructor(private taskService:TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEdit(task: Task) {
    this.onEditTask.emit(task);
  }

  onDelete(task: Task) {
    const dialogRef = this.dialog.open(PopUpComponent);
    dialogRef.componentInstance.onActionConfirmed.subscribe((userChoice) => {
      dialogRef.close();

      if (userChoice) {
        this.onDeleteTask.emit(task);
      }
    });
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }

}
