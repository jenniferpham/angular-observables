import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );
  }

  onActivate(){
    this.usersService.userActivated.next(this.id);  //userActivated() is a Subject - both observer and observable. It is an observable here emitting events and is being subscribed/received by app.component.ts. This is alternative to eventEmitter and output.
  }

}
