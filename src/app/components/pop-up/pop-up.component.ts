import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Output() onActionConfirmed: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirmAction() {
    this.onActionConfirmed.emit(true);
  }

  cancelAction() {
    this.onActionConfirmed.emit(false);
  }

}
