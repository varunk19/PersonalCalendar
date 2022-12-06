import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CalendarService } from '../calendar.service';
import { interval, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  today = true; //to keep track of which tab is currently selected. True if today tab is selected
  data = null;
  err = false;
  showModal = false;
  showAlertModal = false;
  selectedEvent = null;
  dateToday = new Date();
  subscription: Subscription;
  source = interval(1000);
  message = null;
  constructor(private router: Router, private eventService: CalendarService) {
    //prevent back button functionality in dashboard page
    router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        this.router.navigate(['/dashboard'])
      }
    }); 
  }

  ngOnInit(): void {
    this.listTodaysPlans(); //set Today's plans as default selected tab
    this.subscription = this.source.subscribe(val => this.alertFunction());
  }

  alertFunction(){
    //function that keeps running every second to check the time and display the alert popup.
    this.dateToday = new Date();
    for(let item of this.data){
      let eventTimeArr = item.start.split(':');
      let eventTriggerArr = item.triggerdate.split('-');
      let eventTrigger = new Date(eventTriggerArr[0],eventTriggerArr[1]-1,eventTriggerArr[2], eventTimeArr[0],eventTimeArr[1],0,0);
      if(eventTrigger.getDate() == this.dateToday.getDate() && eventTrigger.getMonth() == this.dateToday.getMonth() && eventTrigger.getHours() == this.dateToday.getHours() && eventTrigger.getMinutes() == this.dateToday.getMinutes()){
        if(this.selectedEvent == null || this.selectedEvent.id != item.id){
          this.message = item.name;
          this.selectedEvent = item;
          this.showAlertModal = true;
          break;
        }
      }
    }
  }

  closeAlertModal(){
    this.message = null;
    let rec = parseInt(this.selectedEvent.recurrence);
    switch(rec){
      case 0:{
        this.eventService.deleteEvent(this.selectedEvent).subscribe(response => {
          //do nothing as this is deletion of events with no recurrence.
        }, error =>{
          console.log(error);
        });
      }
      break;
      case 1:{
        //incrementing the trigger date by 1 day for daily events.
        let now = new Date();
        let eventTimeArr = this.selectedEvent.start.split(':');
        let eventTrigger = new Date(now.getFullYear(),now.getMonth(),now.getDate(), eventTimeArr[0],eventTimeArr[1],0,0);
        if(eventTrigger <= now){
          now.setDate(now.getDate()+1);
          this.selectedEvent.triggerdate = moment(now).format("YYYY-MM-DD").toString();
        }
        else
          this.selectedEvent.triggerdate = moment(new Date()).format("YYYY-MM-DD").toString();
      }
      break;
      case 2: {
        //incrementing the trigger date by 7 days for weekly events.
        let now = new Date();
        let eventTimeArr = this.selectedEvent.start.split(':');
        let eventTrigger = new Date(now.getFullYear(),now.getMonth(),now.getDate(), eventTimeArr[0],eventTimeArr[1],0,0);
        if(eventTrigger <= now){
          now.setDate(now.getDate()+7);
          this.selectedEvent.triggerdate = moment(now).format("YYYY-MM-DD").toString();
        }
        else
          this.selectedEvent.triggerdate = moment(new Date()).format("YYYY-MM-DD").toString();
      }
      break;
      case 3: {
        //incrementing the trigger date by 1 month for monthly events.
        let now = new Date();
        let eventTimeArr = this.selectedEvent.start.split(':');
        let eventTrigger = new Date(now.getFullYear(),now.getMonth(),now.getDate(), eventTimeArr[0],eventTimeArr[1],0,0);
        if(eventTrigger <= now){
          now.setMonth(now.getMonth()+1);
          this.selectedEvent.triggerdate = moment(now).format("YYYY-MM-DD").toString();
        }
        else
          this.selectedEvent.triggerdate = moment(new Date()).format("YYYY-MM-DD").toString();
      }
      break;
    }
    this.eventService.updateEvent(this.selectedEvent).subscribe(response => {
      this.showAlertModal = false;
    },
    error => {
      console.log(error);
      this.showAlertModal = false;
    })
  }

  logout(){
    //logout functionality
    localStorage.removeItem("uname");
    this.router.navigateByUrl('/');
  }

  compare( a, b ) {
    //custom helper function to sort the data
    if ( a.triggerdate < b.triggerdate && a.start < b.start){
      return -1;
    }
    if ( a.triggerdate > b.triggerdate && a.start > b.start){
      return 1;
    }
    return 0;
  }
  
  listTodaysPlans(){
    //listing today's plans here
    this.today = true;
    this.data = [];
    document.getElementById("tplan").style.textDecoration = "underline";
    document.getElementById("tplan").style.color = "#c9b60c";
    document.getElementById("aplan").style.color = "#ffffff";
    document.getElementById("aplan").style.textDecoration = "none";
    this.eventService.getTodayPlans().subscribe(response => {
      for(let item of response){
        let itemDateArr = item.triggerdate.split('-');
        let itemTimeArr = item.end.split(':');
        let itemDate = new Date(itemDateArr[0], itemDateArr[1] - 1, itemDateArr[2], itemTimeArr[0],itemTimeArr[1], itemTimeArr[2]);
        if(itemDate>=this.dateToday)
          this.data.push(item);
        else{
          this.eventService.deleteEvent(item).subscribe(response => {
            //do nothing as this is deletion of older events. Events that are currently ongoing will not be deleted.
          }, error =>{
            console.log(error);
          });
        }
          this.data.sort(this.compare);
      }
      if(this.data.length < 1)
        this.err = true;
      else
        this.err = false;
    },
    error => {
      this.err = true;
    });
  }
  

  listAllPlans(){
    //listing all plans here
    this.today = false;
    this.data = []; 
    document.getElementById("tplan").style.textDecoration = "none";
    document.getElementById("tplan").style.color = "#ffffff";
    document.getElementById("aplan").style.color = "#c9b60c";
    document.getElementById("aplan").style.textDecoration = "underline";
    this.eventService.getAllPlans().subscribe(response => {
      for(let item of response){
        let itemDateArr = item.triggerdate.split('-');
        let itemTimeArr = item.end.split(':');
        let itemDate = new Date(itemDateArr[0], itemDateArr[1] - 1, itemDateArr[2], itemTimeArr[0],itemTimeArr[1], itemTimeArr[2]);
        if(itemDate>=this.dateToday)
          this.data.push(item);
          else{
            this.eventService.deleteEvent(item).subscribe(response => {
              //do nothing as this is deletion of older events. Events that are currently ongoing will not be deleted.
            }, error =>{
              console.log(error);
            });
          }
          this.data.sort(this.compare);
      }
      if(this.data.length < 1)
        this.err = true;
      else
        this.err = false;
    },
    error => {
      this.err = true;
    });
  }

  openModal(e: any){
    //function to open the confirm delete popup
    this.selectedEvent = e;
    this.showModal = true;
  }

  closeModal(){
    //function to close the confirm delete popup
    this.selectedEvent = null;
    this.showModal = false;
  }

  edit(e: any){
    //function to go to edit form
    this.router.navigateByUrl('/form/edit/'+e.id);
  }

  delete(){
    //function to delete the event
    this.eventService.deleteEvent(this.selectedEvent).subscribe(response => {
      this.closeModal();
      this.selectedEvent = null;
      if(this.today)
        this.listTodaysPlans();
      else
        this.listAllPlans();
    },
    error => {
      console.log(error);
    })
  }
}
