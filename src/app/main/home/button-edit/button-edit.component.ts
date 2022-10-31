import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.scss']
})
export class ButtonEditComponent implements OnInit {
  @Input() delele: boolean = false;

  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  goToEdit() {
    this.onEdit.emit();
  }

  doDelete() {
    this.onDelete.emit();
  }

  get isLogged() {
    return this.authService.loggedIn;
  }

}
