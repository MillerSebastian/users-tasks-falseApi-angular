import { Component, input, output, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-user-role-validate',
  imports: [MatButtonToggleModule],
  templateUrl: './user-role-validate.html',
  styleUrl: './user-role-validate.css',
})
export class UserRoleValidate implements OnInit {
  // Input para recibir el rol inicial
  initialRole = input<string>('2'); // Por defecto 'user'

  // Output para emitir cambios de rol
  roleChange = output<string>();

  // Estado actual del rol
  currentRole: string = '2';

  ngOnInit() {
    // Establecer el rol inicial
    this.currentRole = this.initialRole();
  }

  // Método para manejar cambio de rol
  onRoleChange(value: string) {
    this.currentRole = value;
    this.roleChange.emit(value);
  }

  // Método para obtener el valor actual del rol
  getCurrentRole(): string {
    return this.currentRole;
  }
}
