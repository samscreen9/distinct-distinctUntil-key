
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  of,
  fromEvent,
  AsyncSubject,
  BehaviorSubject,
  interval,
  ReplaySubject,
  Subject,
  Observable,
  map,
  catchError,
  throwError,
  take,
  retry,
  delay,
  tap,
  retryWhen,
  combineLatest,
  concat,
  forkJoin,
  merge,
  skip,
  skipUntil,skipWhile, distinct, from, distinctUntilChanged, distinctUntilKeyChanged
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
name = 'Angular';
/*projects each value from source into new value and check for equality with all previous values*/
ngOnInit(){
  let source1 = of(1, 2, 3, 4, 5,5);
  let subscribe1 = source1.pipe(distinct()).subscribe((val) => console.log(val));

  /*With key selector for distinct*/
  let o=[{id:1,name:"n1"},{id:2,name:"n1"},
  {id:1,name:"n2"},{id:2,name:"n3"}]
  from(o).pipe(distinct((x=>x.name))).subscribe(
    (data)=>{console.log(data);}
  )

  /****distinctUntilChange check for equality with last emitted value only and not all previous values like distinct, if 1,2,2,1,3 is the given sequence then distinctUntilChange will give out put 1,2,1,3****/
 console.log("distinct until changed as follows")
  of(1,2,2,1,3,1).pipe(distinctUntilChanged()).subscribe(
    (data)=>{console.log(data);}
  )
console.log(" - -- - --  - - -- - -")
  of(1,2,3,4).pipe(distinctUntilChanged((prev,cur)=>{
    return cur==prev+1
  })).subscribe(
    (data)=>{console.log(data);}
  )
  /*will be checking name with previous one element only*/
  let at=[{id:1,name:"n1"},{id:2,name:"n2"},
  {id:3,name:"n2"},{id:4,name:"n4"},{id:5,name:"n2"}]
  from(at).pipe(distinctUntilChanged((prev,cur)=>{
    return prev.name==cur.name
  })).subscribe(
    (data)=>{console.log(data);}
  )
console.log("distinctUntilKeyChanged")
  /*distinctUntilKeyChange,gets an extra parameter as key here 'name' */
  of(...at).pipe(distinctUntilKeyChanged('name',(prev,curt)=>{
    return prev.substring(0,1)==curt.substring(0,1)
  })).subscribe(
    (data)=>{console.log(data)}
  )
}


}