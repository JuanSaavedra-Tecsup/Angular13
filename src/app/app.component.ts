import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './services/profesor-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profesores: any = []
  estate = 0
  teacher = {
    id: 0,
    nombre: null,
    apellido: null,
    telefono: null,
    estado: '1',
  }

  constructor(private service: ProfesorService){}

  ngOnInit(){
    this.listar()
  }

  listar(){
    this.service.getProfesores().subscribe(data =>{
      this.profesores = data
    })
  }

  agregar(){
    console.log(this.teacher)
    if(this.teacher.nombre != null && this.teacher.apellido != null && this.teacher.telefono != null){
      this.profesores.push(this.teacher)
      this.service.insertProfesor(this.teacher).subscribe(err =>{
        if(err)
        console.log(err)
      })
      this.cancelar()
      this.listar()
    }
  }

  eliminar(profesor){
    var index = this.profesores.indexOf(profesor)
    this.profesores.splice( index, 1 )

    this.service.deleteProfesor(profesor.id).subscribe(err =>{
      if(err)
        console.log(err)
    })
  }

  actualizar(){
    this.service.updateProfesor(this.teacher.id, this.teacher).subscribe(err => {
      if(err)
        console.log(err)
      
      this.cancelar()
      this.listar()
    })
  }

  seleccionar(profesor){
    this.teacher.id = profesor.id
    this.teacher.nombre = profesor.nombre
    this.teacher.apellido = profesor.apellido
    this.teacher.telefono = profesor.telefono
    this.teacher.estado = profesor.estado
    this.estate = 1
  }

  cancelar(){
    this.teacher.nombre = null
    this.teacher.apellido = null
    this.teacher.telefono = null
    this.teacher.estado = '1'
    this.estate = 0
  }
}
