import { Time } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() pickedDate: Date | null = null;
  @Output() pickedDateChange: EventEmitter<Date | null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.pickedDateChange.emit(this.pickedDate);
  }

}
