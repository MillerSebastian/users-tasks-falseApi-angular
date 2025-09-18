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
  // Input para controlar si el botón está deshabilitado
  disabled = input<boolean>(false);

  // Input para el texto del botón
  buttonText = input<string>('Guardar Usuario');

  // Output para emitir cuando se hace clic
  saveClick = output<void>();

  // Método para manejar el clic
  onSaveClick() {
    this.saveClick.emit();
  }
}
