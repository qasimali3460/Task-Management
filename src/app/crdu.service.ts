import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CrduService {

  constructor(private http:HttpClient) { }
  addNewTask(data)
  {
    console.log("Data Got is "+data);
  
    return this.http.post("http://localhost:3000/todo",{"description":data});
  }
  getData()
  {
    return this.http.get("http://localhost:3000/todo");
  }
  complete(data)
  {
    console.log("I Also got this"+data);
    let id={"_id":data};
    return this.http.delete("http://localhost:3000/todo/"+data);
  }
}
