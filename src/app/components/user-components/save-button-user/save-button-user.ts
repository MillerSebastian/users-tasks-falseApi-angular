import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-save-button-user',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './save-button-user.html',
  styleUrl: './save-button-user.css',
})
export class SaveButtonUser {
  disabled = input<boolean>(false);
  buttonText = input<string>('Guardar Usuario');
  saveClick = output<void>();

  onSaveClick() {
    this.saveClick.emit();
  }
}
