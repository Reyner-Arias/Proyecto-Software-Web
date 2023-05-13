import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/User.model'

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss']
})
export class GetUsersComponent implements OnInit {

  users = new Array<User>();
 
  constructor(private usersService: UsersService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      error: (err: any) => { 
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: Array<User>) => {
        this.showSpinner = false;
        if(res.length == 0) {
          this.modalMessage = "Aún no hay usuarios."
          this.openCloseInfoModal();
        }
        this.users = res;
      }
    });
  }

  deleteUser(email: String) {
    this.usersService.deleteUser(email).subscribe({
      error: (err: any) =>{
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: () => {
        this.toastr.success('El usuario se eliminó correctamente', 'Éxito');
        setTimeout(() => {
          location.reload();
        }, 3000); // Espera 3 segundos (3000 milisegundos) antes de recargar
      }
    });
  }
  
  /* --------------------- Spinner --------------------- */

  public showSpinner = true;

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */
}
