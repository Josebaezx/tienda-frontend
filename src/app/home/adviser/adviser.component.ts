import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {

  saludo: string = 'Hola que tal';

  constructor() { }

  ngOnInit(): void {
  }

}
