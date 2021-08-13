import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users';


declare var M: any;
declare var CanvasJS: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(public userService: UsersService) { 

   
  }

  ngOnInit(): void {
    this.getUsers();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }

  addOrEditUser(form?: NgForm){
    if(form){
      if(form.value._id){
        this.userService.putUser(form.value).subscribe (res => {
          this.resetForm(form);
          M.toast({html: 'usuario actualizado exitosamente'});
          this.getUsers();
        });

      }else {
        delete form.value._id;
        this.userService.postUser(form.value).subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'usuario guardado exitosamente'});
          this.getUsers();
        });
      }
    }
  }

  getUsers(){
    var admin = 0, tech = 0, op = 0, client = 0, security = 0;
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res as Users[];

      for(var i = 0; i<this.userService.users.length; i++){
        if(this.userService.users[i].type==1){
          admin++;
        }else if(this.userService.users[i].type==2){
          tech++;
        }else if(this.userService.users[i].type==3){
          op++;
        }else if(this.userService.users[i].type==4){
          client++;
        }else if(this.userService.users[i].type==5){
          security++;
        }
      }
      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "TIPOS DE USUARIOS"
        },
         axisX: {
          title: "Tipos"
         },
          axisY: {
            title:"Cantidad"
          },
        data: [{
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
              indexLabelFontSize: 16,
              toolTipContent:"<b>{label}</b>: {y}",
          dataPoints: [
            { y: admin, label: "Administrador" },
            { y: tech, label: "Tecnico" },
            { y: op, label: "Operador" },
            { y: client, label: "Cliente" },
            { y: security, label: "Guardia", indexLabel: "\u2605 Highest" },
          ]
        }]
      });
      chart.render();

      var chart2 = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "TIPOS DE USUARIOS"
        },
         axisX: {
          title: "Tipos"
         },
          axisY: {
            title:"Cantidad"
          },
        data: [{
          type: "pie", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
              indexLabelFontSize: 16,
              toolTipContent:"<b>{label}</b>: {y}",
          dataPoints: [
            { y: admin, label: "Administrador" },
            { y: tech, label: "Tecnico" },
            { y: op, label: "Operador" },
            { y: client, label: "Cliente" },
            { y: security, label: "Guardia", indexLabel: "\u2605 Highest" },
          ]
        }]
      });
      chart2.render();
      
     });
  }
  loadData(user: Users){
    this.userService.selectedUser = user;
  }

  deleteUser(_id: string ){
    if(confirm('estas seguro que quiere eliminar este usuario?')){
      this.userService.deleteUser(_id).subscribe(res => {
        this.getUsers();
        M.toast({htms: 'usuario eliminado correctamente'});
      });
    }
  }

}
