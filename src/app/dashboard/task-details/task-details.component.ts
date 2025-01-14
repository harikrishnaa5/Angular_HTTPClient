import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

@Input() taskDetails: Task | null = null

@Output() 
closeTaskDetails: EventEmitter<boolean> = new EventEmitter<boolean>()
  CloseTaskDetails() {
    this.closeTaskDetails.emit(false)
  }
}
