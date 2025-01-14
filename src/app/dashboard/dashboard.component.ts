import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  showCreateTaskForm: boolean = false;
  showTaskDetails: boolean = false
  isEditMode: boolean = false;
  allTasks: Task[] = [];
  isLoading: boolean;
  errorMessage: string | null;
  errorSub: Subscription
  taskDetails: Task | null = null

  http: HttpClient = inject(HttpClient);
  task: TaskService = inject(TaskService);
  selectedTask: Task;
  selectedTaskId: string;

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

  OnTaskDetailsClick(id: string | undefined) {
    this.showTaskDetails = true
    this.task.FetchTaskDetails(id).subscribe({next: (data: Task) => {
      this.taskDetails = data
    }})
  }

  CloseTaskDetails() {
    this.showTaskDetails = false
  }

  ngOnInit(): void {
    this.FetchAllTasks();
    this.errorSub = this.task.errorSubject.subscribe({
      next: (httpError) => {
        this.setErrorMessage(httpError);
      },
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }

  OnEditClick(id: string | undefined) {
    this.selectedTaskId = id;
    this.showCreateTaskForm = true;
    this.isEditMode = true;
    this.selectedTask = this.allTasks.find((task) => task.id === id);
  }

  FetchAllTasksClicked() {
    this.FetchAllTasks();
  }

  DeleteTask(id: string | undefined) {
    this.task.DeleteTask(id);
  }

  DeleteAllTasks() {
    this.task.DeleteAllTasks();
  }
  CreateTaskOrUpdateTask(data: Task) {
    if (this.isEditMode) this.task.UpdateTask(this.selectedTaskId, data);
    else this.task.CreateTask(data);
  }

  private FetchAllTasks() {
    this.isLoading = true;
    this.task.GetAllTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.setErrorMessage(error);
        this.isLoading = false;
      },
    });
  }

  private setErrorMessage(err: HttpErrorResponse) {
    if (err.error.error === 'Permission denied')
      this.errorMessage = 'You have been denied permission to access the data';
    else this.errorMessage = err.message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
