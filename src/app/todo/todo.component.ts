import { CrduService } from './../crdu.service';
import { Component, OnInit } from '@angular/core';
import  io from 'socket.io-client';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  socket;
  toDoList:any;
  M:any;
  constructor(private http:CrduService) { 
    this.socket=io('ws://localhost:3000');
  }

  ngOnInit() {
    this.refresh();
    this.socket.on('newTaskAdded',() => {
      this.refresh();
    });
  }
  
  addToDo(data){
    console.log(data);
    this.http.addNewTask(data).subscribe((doc) => {
      // this.openSnackBar("New Task Added Successfully");
      console.log(doc);
    });
    // this.toDoList.push(data);
  }
  refresh()
  {
    this.http.getData().subscribe(res => {
      this.toDoList=res;
    })
  }
  finished(data)
  { 
    this.http.complete(data).subscribe(doc => {
      // console.log("Got Response"+JSON.stringify(doc));
    });
    // this.openSnackBar("Task Completed Successfully");
    // M.toast({html: 'I am a toast!'})
    
  }

}
