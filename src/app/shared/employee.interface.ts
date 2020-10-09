/*
============================================
; Title:  item.interface.ts
; Author: Professor Krasso
; Date:   08 October 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; Interface to define an Employee
============================================
*/
// Import the Item Interface to include the Item fields
import { Item } from './item.interface';

export interface Employee {
  // Define the fields needed for this Interface
  empId: string;
  toDos: Item[];
  done: Item[];
}
