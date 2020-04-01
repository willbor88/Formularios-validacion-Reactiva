import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray  } from "@angular/forms";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genero = ['Hombre', 'Mujer'];
  miFormulario : FormGroup 
  NombresInvalidos=['Wilmar','will']
 


ngOnInit(){
  this.miFormulario = new FormGroup({
    'DatosUsuario':new FormGroup({'NombreUsuario':new FormControl(null,[Validators.required,
      this.FunUsuariosProhibidos.bind(this)]),//<USAMOS bind para que reconsco el metodo
      //Recibe dos Argumentos:El primer Agurmento  es el valor por defecto que tendra el control, el segundo son los validadores que aplicaremos al control
    'email':new FormControl(null,[Validators.required,Validators.email],this.emailNoPermitido)}),//el tecer argumento son validadores asincronos
    
    'gender':new FormControl('Hombre'),
    'hobby':new FormArray([]),//Permite recibir varios elementos para formulario.Puede ser inicilizado con FormControls o vacio
    //'control': new FormControl(null,[Validators.required,Validators.required])
  })

  //Escuchar los cambios en el formulario
  // this.miFormulario.valueChanges.subscribe(
  //   (value)=>console.log(value)
  // )

  //Escuchar el estado del formulario permanente
  this.miFormulario.statusChanges.subscribe(
    (status)=>console.log(status)
  )
//Usar setValue: Asignar todos los valores por defecto en cualquier momento
  // this.miFormulario.setValue({
  //   'DatosUsuario':{
  //   'NombreUsuario':'Wil',
  //   'email':'pruebas@hotmail.com',},
  //   'gender':'Hombre',
  //   'hobby':[]
  // })

  //Usar setValue: Asignar algun valor por defecto en cualquier momento
  this.miFormulario.patchValue({
    'DatosUsuario':{
        'NombreUsuario':'Wilson'
  }})
  
}

Submit(){
  console.log(this.miFormulario)
  this.miFormulario.reset({
    //pueado resetar los campos que desee con un objeto
  })
}

anadirHobby(){
  const control= new FormControl(null,Validators.required);//Crear el form control para luego añadir
 (<FormArray>this.miFormulario.get('hobby')).push(control)//Debemos especifiar que es un FormArray para realizar el push
}

//Metodo validators
FunUsuariosProhibidos(control:FormControl):{[key:string]:boolean}
{
 if(this.NombresInvalidos.indexOf(control.value)!==-1){//index entrega un menos uno sino encontro el usuario en elemento control.vauo
   return {'NombreInvalido':true}
 }
 return null
}
//Metodo validators
emailNoPermitido(control:FormControl):Promise<any> | Observable<any>{
 const promise= new Promise<any>((resolve,reject)=>{
   setTimeout(()=>{
if(control.value === 'prueba@hotmail.com'){
  resolve({'emailnopermitido':true})
}
else{
  resolve (null)
}
   },3000)//3 segundo despues cambian las clasesd el elemento valid a invalid si es un correo no permitido
 })
 return promise
}


   

}
