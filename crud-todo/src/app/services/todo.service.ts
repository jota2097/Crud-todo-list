import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { Guid } from "guid-typescript";

@Injectable()
export class TodoService {

  constructor(private _formBuilder: FormBuilder) { }
  form: FormGroup;
  todoList: Todo[] = [];
  addButton: string = 'ADD';

  buildFormGroup() {
    this.form = this._formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getTodoList() {
    return this.todoList;
  }

  insertTodo(todo: Todo) {
    todo.id == '' ? this.insertItem(todo) : this.updateItem(todo);
    this.resetForm();
  }

  editTodoList(todo: any) {
    this.form.patchValue(todo);
    this.addButton = 'Modificar';
  }

  insertItem(todo: Todo) {
    todo.id = Guid.create().toString();
    this.todoList.push(todo);
  }

  updateItem(todo: Todo) {
    let updateItem = this.getTodoList().find(item => item.id == todo.id);
    let index = this.getTodoList().indexOf(updateItem);
    this.getTodoList()[index] = todo;
  }

  deleteTodoList($key: string) {
    // this.todoList.($key);
  }

  resetForm(): void {
    this.addButton = 'Agregar';
    this.form.reset();
  }

}