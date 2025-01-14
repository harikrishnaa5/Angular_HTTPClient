import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../Model/Task';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { LoggingService } from './Logging.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  logService: LoggingService = inject(LoggingService);
  errorSubject = new Subject<HttpErrorResponse>();
  GetAllTasks() {
    let header = new HttpHeaders() // this is immutable
    header = header.set('content-type', 'application/json') // as it is immutable we re-assign the header with its new instance created using .set()
  


    let queryParams = new HttpParams()
    queryParams = queryParams.set('orderBy', '"$key"')
    queryParams = queryParams.set('limitToFirst', '2')
    const response = this.http
      .get<{ [key: string]: Task }>(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json',
        {headers: header, params: queryParams, observe: 'body'}
      )
      .pipe(
        map((response) => {
          console.log(response)
          let tasks = [];
          for (let key in response) {
            if (response.hasOwnProperty(key))
              tasks.push({ id: key, ...response[key] });
          }
          return tasks;
        }),
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      );
    return response;
  }

  CreateTask(data: Task) {
    this.http
      .post(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json',
        data
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  UpdateTask(id: string | undefined, data: Task) {
    this.http
      .put(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json',
        data
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteAllTasks() {
    this.http
      .delete(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks.json', {observe: 'events'}
      )
      .pipe(
        tap((event) => {
          if(event.type === HttpEventType.Sent) {
            console.log('sent event occured')
          }
          else if(event.type === HttpEventType.Response)
            console.log('response event occured')
          console.log(event)
        }),
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteTask(id: string | undefined) {
    this.http
      .delete(
        'https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json'
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.logService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  FetchTaskDetails(id: string | undefined) {
    return this.http.get<Task>('https://angularhttpclient-b8ed3-default-rtdb.firebaseio.com/tasks/' + id + '.json')
    .pipe(map(data => {
      let task = {id: id, ...data}
      return task
    }))
  }
}
