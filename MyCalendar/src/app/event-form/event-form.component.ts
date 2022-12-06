import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../calendar.service';
import * as moment from 'moment';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  err = null;
  mode = ''; //to know whether we are editing an event or adding a new event
  title = '';
  name = '';
  start = '';
  end = '';
  date =  '';
  recurrence = null;
  id = null;
  constructor(private router: Router, private eventService: CalendarService, private route: ActivatedRoute) { 
    this.mode = this.route.snapshot.params["mode"];
    if(this.mode == 'add')
      this.title = 'Add a new event';
    else
      this.title = 'Edit event';
  }

  ngOnInit(): void {
    if(this.mode == 'edit'){
      //autopopulating the data on page load if we are editing the event
      this.id = parseInt(this.route.snapshot.params["id"]);
      this.eventService.getAllPlans().subscribe( response => {
        for(let item of response){
          if(item.id == this.id){
            this.name = item.name;
            this.start = item.start;
            this.end = item.end;
            this.date = item.date;
            this.recurrence = item.recurrence.toString();
          }
        }
      },
      error => {
        console.log(error);
      });
    }
  }

  onSubmit(eventForm: NgForm){
    this.err = null;
    let data = eventForm.value;
    let startTime = data.start;
    let endTime = data.end;
    let triggerdate = '';
    if(startTime > endTime){
      //validation to ensure entered start time is less than end time
      this.err = 'Please enter valid data';
      return;
    }
    data.username = localStorage.getItem("uname");
    let rec = parseInt(eventForm.value.recurrence);
    data.recurrence = rec;
    //logic to automatically set the trigger date based on recurrence selected
    switch(rec){
      case 0:{
        //None recurrence so setting today's date as trigger date.
        //Will be deleted on load if past time is selected.
          data.triggerdate = moment(new Date()).format("YYYY-MM-DD").toString();
      }
      break;
      case 1:{
        //Daily recurrence so trigger date will be today's date if entered time is a future time else tomorrows date is set.
        let now = new Date();
        let eventTimeArr = data.start.split(':');
        let eventTrigger = new Date(now.getFullYear(),now.getMonth(),now.getDate(), eventTimeArr[0],eventTimeArr[1],0,0);
        if(eventTrigger <= now){
          now.setDate(now.getDate()+1);
          data.triggerdate = moment(now).format("YYYY-MM-DD").toString();
        }
        else
          data.triggerdate = moment(new Date()).format("YYYY-MM-DD").toString();
      }
      break;
      case 2: {
        //Weekly recurrence so trigger date will be today's date if entered time is a future time else date after 7 days is set.
        let now = new Date();
        let eventTimeArr = data.start.split(':');
        let eventTrigger = new Date(now.getFullYear(),now.getMonth(),now.getDate(), eventTimeArr[0],eventTimeArr[1],0,0);
        if(eventTrigger <= now){
          now.setDate(now.getDate()+7);
          data.triggerdate = moment(now).format("YYYY-MM-DD").toString();
        }
        else
          data.triggerdate = moment(new Date()).format("YYYY-MM-DD").toString();
      }
      break;
      case 3: {
        //Weekly recurrence so trigger date will be today's date if entered time is a future time else same date in next month is set.
        let now = new Date();
        let eventTimeArr = data.start.split(':');
        let eventTrigger = new Date(now.getFullYear(),now.getMonth(),now.getDate(), eventTimeArr[0],eventTimeArr[1],0,0);
        if(eventTrigger <= now){
          now.setMonth(now.getMonth()+1);
          data.triggerdate = moment(now).format("YYYY-MM-DD").toString();
        }
        else
          data.triggerdate = moment(new Date()).format("YYYY-MM-DD").toString();
      }
      break;
    }
    if(eventForm.value.date != ''){
      data.triggerdate = eventForm.value.date;
    }
    if(this.mode == 'add'){
      this.eventService.addEvent(data).subscribe( response => {
        this.err = null;
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.err = 'Please enter valid data';
      });
    }
    else{
      data.id = this.id;
      if(this.mode == 'edit'){
        this.eventService.updateEvent(data).subscribe( response => {
          this.err = null;
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          this.err = 'Please enter valid data';
        });
      }
    }
  }
}
