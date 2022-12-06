import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  err='';
  disableBtn = false;
  constructor(private router: Router,private loginService: CalendarService) {
    //prevent back button functionality in login page
    router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        this.router.navigate(['/'])
      }
    }); 
  }

  ngOnInit(): void {
  }

  onSubmit(lgForm: NgForm){
    //login functionality
    this.disableBtn = true;
    this.loginService.login(lgForm.value).subscribe(response => {
      this.router.navigateByUrl('/dashboard');
      this.err = '';
      this.disableBtn = false;
      localStorage.setItem("uname",lgForm.value.username);
    },
    error => {
      this.err = 'Invalid username or passsword. Please try again.'
      this.disableBtn = false;
      setTimeout(()=>{
        this.err = '';
      },4000);
    });
  }
}
