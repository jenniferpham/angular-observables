import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    // create an observable that emits events
    const myNumbers = Observable.interval(1000);

    //observer- subscribes to events
    this.numbersObsSubscription = myNumbers.subscribe(
      (data: any) => {
        console.log(data * 2);
        return data * 2;
      }
    );
  
    const myObservable = Observable.create( (observer: Observer<string>)=> {
      //building bridge from observable to observer
      setTimeout( ()=>{
        observer.next('first package'); //next pushes the next data package
      }, 1000);
      setTimeout( ()=> {
        observer.next('second package');
      }, 2000);
      setTimeout( ()=> {
          observer.error('this doesnt work');
          // observer.complete();
        }, 3000);
      setTimeout( ()=>{
        observer.next('4th package'); //doesnt run after observer is completed or error
      }, 4000)
    })
  
      this.customObsSubscription = myObservable.subscribe( (data: string) => {
         console.log(data);
      }, (err: string) => {
         console.log('error: ', err);
      }, ()=> {
        console.log('completed');
      })

  }

  ngOnDestroy(){
    //memory leak if you don't unsubscribe when you leave the component
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }


}
