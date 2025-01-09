import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  EmitFormData: EventEmitter<Task> = new EventEmitter<Task>()

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnFormSubmit(form: NgForm){
    this.EmitFormData.emit(form.value)
    this.OnCloseForm()
  }
}