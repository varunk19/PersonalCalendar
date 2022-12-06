import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  err='';
  disableBtn = false;
  constructor(private router: Router,private loginService: CalendarService) { }

  ngOnInit(): void {
  }

  onSubmit(rgForm: NgForm){
    //registration functionality
    this.disableBtn = true;
    this.loginService.register(rgForm.value).subscribe(response => {
      this.router.navigateByUrl('/dashboard');
      this.err = '';
      this.disableBtn = false;
      localStorage.setItem("uname",rgForm.value.username);
    },
    error => {
      this.err = 'Username either exists or your entries are invalid. Please try again.'
      this.disableBtn = false;
      setTimeout(()=>{
        this.err = '';
      },4000);
    });
  }
}
