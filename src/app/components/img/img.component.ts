import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  selector: 'app-img',
  imports: [],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() img:string = "valor inicial";
  
  @Output() loaded = new EventEmitter<string>();
  public messageDefault = "Imagen no encontrada"; 

  COUNTER = 0;

  constructor(){
    console.log("constructor img", "imValute=>", this.img);
    
  }

  ngOnChanges(): void {
    //corre antes y durante de la render
    console.log("ngOnChanges","imgValute=>", this.img);
    
  }

  ngOnInit(): void {
    //corre antes de de que se este renderisando    
    console.log("ngOnInit","imgValute=>", this.img);
  }

  ngAfterViewInit(): void {
    //despues de que todo se este renderisando
    //handler children
    console.log("ngAfterViewInit");
  } 

  ngOnDestroy(): void {
    console.log("ngOnDestroy.");
  }

  imgError(){
    this.img = this.messageDefault;
  }

  imgLoading(){
    this.loaded.emit(this.img)
  }
}
