import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'wdm-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  inputSearch: string = '';
  loading: boolean = false;

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    inputSearch: ['', Validators.required],
  });

  search() {
    if (this.form.valid) this.loading = true;
  }
}
