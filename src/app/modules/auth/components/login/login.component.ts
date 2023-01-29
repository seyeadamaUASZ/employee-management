import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValid:boolean=true;
  ngForm!:FormGroup;
  error:boolean=false
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  initForm(){
    this.ngForm= this.fb.group({
       username:['',Validators.required],
       password:['',Validators.required]
    })
  }

  submit(){

  }

}
