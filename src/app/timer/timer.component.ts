import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {TimerService} from './timer.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;

  countdownEndSubscription : Subscription = null ;

  constructor(
    public    timer: TimerService
  ) { }

  ngOnDestroy(){
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    
  }


  ngOnInit(): void {
    this.timer.restartCountdown(this.init);

    this.countdownEndSubscription= this.timer.countdownEnd$.subscribe(()=>{
      console.log("---coundownends---");
      this.onComplete.emit();
    })

  }

  

}
