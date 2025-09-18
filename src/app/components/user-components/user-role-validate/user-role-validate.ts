import { Component, input, output, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-user-role-validate',
  imports: [MatButtonToggleModule],
  templateUrl: './user-role-validate.html',
  styleUrl: './user-role-validate.css',
})
export class UserRoleValidate implements OnInit {
  initialRole = input<string>('2');
  roleChange = output<string>();
  currentRole: string = '2';

  ngOnInit() {
    this.currentRole = this.initialRole();
  }

  onRoleChange(value: string) {
    this.currentRole = value;
    this.roleChange.emit(value);
  }

  getCurrentRole(): string {
    return this.currentRole;
  }
}
