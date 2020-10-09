/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date:   19 September 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; Typescript for Home Component
============================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
//import { HttpClient } from '@angular/common/http';
import { TaskService } from './../../shared/task.service';
import { Item } from '../../shared/item.interface';
import { Employee } from '../../shared/employee.interface';
import { CookieService } from 'ngx-cookie-service';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';
//import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // find the tasks
  toDos: Item[];
  done: Item[];
  employee: Employee;

  //empId: number;
  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    // Find all tasks for a specific empId, subscribe to them, and declare them
    this.empId = this.cookieService.get('session_user');  //get the active user

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log("findAllTasks Server Response:");
      console.log(res);

      this.employee = res.data;
      console.log("Employee object");
      console.log(this.employee);

      /*this.toDos = res['data'].toDos;
      this.done = res['data'].done;

      console.log(this.toDos);
      console.log(this.done);*/

    }, err => {
      console.log(err);
    }, () => {
      // Perform when everything else is complete
      this.toDos = this.employee.toDos;
      this.done = this.employee.done;

      console.log("This is what's in the complete section");
      console.log(this.toDos);
      console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log("The existing list was reordered");
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log("Task items moved to container")

      this.updateTaskList(this.empId, this.toDos, this.done);
    }
  }

  private updateTaskList(empId: string, toDos: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, toDos, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.toDos = this.employee.toDos;
      this.done = this.employee.done;
    })
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.toDos = this.employee.toDos;
          this.done = this.employee.done;
        })
      }
    })

  }

  deleteTask(taskId: string) {
    if (taskId) {
      console.log("Task item: ${taskId} has been deleted");

      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;

      }, err => {
        console.log(err);
      }, () => {
        this.toDos = this.employee.toDos;
        this.done = this.employee.done;
      })

    }
  }

}
