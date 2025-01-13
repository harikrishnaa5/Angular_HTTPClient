import { Component, Input, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;

  isEditMode: boolean = false;
  allTasks: Task[] = [];
  isLoading: boolean

  http: HttpClient = inject(HttpClient);
  task: TaskService = inject(TaskService);
  selectedTask: Task;
  selectedTaskId: string

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.isEditMode = false;
    this.selectedTask = {
      title: '',
      desc: '',
      assignedTo: '',
      createdAt: '',
      priority: '',
      status: '',
    };
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  ngOnInit(): void {
    this.FetchAllTasks();
  }

  OnEditClick(id: string | undefined) {
    this.selectedTaskId = id
    this.showCreateTaskForm = true;
    this.isEditMode = true;
    this.selectedTask = this.allTasks.find((task) => task.id === id);
  }

  FetchAllTasksClicked() {
    this.FetchAllTasks();
  }

  DeleteTask(id: string | undefined) {
    this.task.DeleteTask(id).subscribe((res) => {
      console.log(res);
      this.FetchAllTasks();
    });
  }

  DeleteAllTasks() {
    this.task.DeleteAllTasks().subscribe(() => {
      this.FetchAllTasks();
    });
  }
  CreateTaskOrUpdateTask(data: Task) {
    if (this.isEditMode)
      this.task.UpdateTask(this.selectedTaskId, data).subscribe((res) => {
        console.log(res);
        this.FetchAllTasks();
      });
    else
      this.task.CreateTask(data).subscribe((res) => {
        console.log(res);
        this.FetchAllTasks();
      });
  }

  private FetchAllTasks() {
    this.isLoading = true
    this.task.GetAllTasks().subscribe((tasks) => {
      console.log(tasks);
      this.allTasks = tasks;
      this.isLoading = false
    });
  }
}
