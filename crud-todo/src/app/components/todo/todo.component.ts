import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildFormGroup();
  }

  form: FormGroup;
  todoList: Todo[] = [];
  addButton: string = 'Agregar';

  buildFormGroup() {
    this.form = this._formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getTodoList(): Todo[] {
    return this.todoList;
  }

  onSubmit(): void {
    let todo = this.form.value as Todo;
    todo.id == '' ? this.insertItem(todo) : this.updateItem(todo);
    this.resetForm();
  }

  editTodoList(todo: any): void {
    this.form.patchValue(todo);
    this.addButton = 'Modificar';
  }

  insertItem(todo: Todo): void {
    todo.id = Guid.create().toString();
    this.todoList.push(todo);
  }

  updateItem(todo: Todo): void {
    let updateItem = this.getTodoList().find(item => item.id == todo.id);
    let index = this.getTodoList().indexOf(updateItem);
    this.getTodoList()[index] = todo;
  }

  deleteTodoList(index: number): void {
    this.getTodoList().splice(index, 1);
  }

  resetForm(): void {
    this.addButton = 'Agregar';
    this.form.reset();
    this.defaultValuesFormGroup();
  }

  defaultValuesFormGroup(): void {
    this.form.controls['id'].setValue('');
    this.form.controls['title'].setValue('');
    this.form.controls["description"].setValue('');
  }


}
