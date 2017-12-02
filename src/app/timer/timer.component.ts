import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {TimerService} from './timer.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;

  countdownEndSubscription : Subscription = null ;
  countdownSubscription : Subscription = null;
  countdown : number = 0;

  get progress(){
    // console.log((this.init-this.countdown)/this.init*100)
    return (this.init-this.countdown)/this.init*100
  }


  constructor(
    public timer: TimerService,
    private cdRef : ChangeDetectorRef,
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

    this.countdownSubscription = this.timer.countdown$
    .subscribe((data)=>{
      this.countdown = data;
      this.cdRef.markForCheck();
    })

  }

  

}
