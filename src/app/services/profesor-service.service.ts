import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService{

  url_base = "http://localhost:3000/profesores"

  constructor(private http: HttpClient) { }

  getProfesores(){
    return this.http.get(this.url_base + '/listar')
  }

  insertProfesor(profesor){
    return this.http.post(this.url_base, profesor)
  }

  deleteProfesor(id){
    return this.http.delete(this.url_base+'/'+id)
  }

  updateProfesor(id, profesor){
    return this.http.put(this.url_base+'/'+id, profesor)
  }
}
