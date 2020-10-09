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
import { HttpClient } from '@angular/common/http';
import { TaskService } from './../../shared/task.service';
import { Item } from '../../shared/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // find the tasks
  toDos: Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService) {
    this.taskService.findAllTasks().subscribe(res => {
      this.toDos = res['data'].toDos;
      this.done = res['data'].done;
    }, err => {
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

}
