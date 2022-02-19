import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from './Models/person';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  person: Person;
  listPeople: Array<Person> = [];
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.validation();
    this.person = new Person();
  }

  addPerson(): string {
    if (this.registerForm.valid) {
      this.person = Object.assign({}, this.registerForm.value);
      this.listPeople.push(this.person);
      return 'Pessoa adicionada!';
    } else {
      return 'Campos obrigatórios';
    }
  }

  cleanForm() {
    this.registerForm.reset();
  }

  deletePerson(person: Person): string {
    this.listPeople.forEach((element, index) => {
      if (element == person) this.listPeople.splice(index, 1);
    });
    return 'Pessoa deletada!';
  }

  getFullName(person: Person): string {
    return `${person.firstName} ${person.lastName}`;
  }

  validation() {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      age: ['', Validators.required],
    });
  }
}
