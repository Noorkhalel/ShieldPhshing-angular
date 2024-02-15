import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';

interface SideNavToggle{
  ScreenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations:[
    fadeInOut,
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)',offset: '0'}),
            style({transform: 'rotate(2turn)',offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit{

  @HostListener('window: resize', ['$event'])
    onResize(event: any){
      this.ScreenWidth = window.innerWidth;
      if(this.ScreenWidth <= 768){
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, ScreenWidth: this.ScreenWidth})
      }
    }

    constructor(public router: Router){}

    ngOnInit(): void {
      this.ScreenWidth = window.innerWidth; 
    }
  
    @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
    collapsed = false;
    navData = navbarData;
    ScreenWidth = 0;
    multiple: boolean = false;
    toggleCollapse(): void{
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({collapsed: this.collapsed, ScreenWidth: this.ScreenWidth})
    }
    
    closeSidenav(): void{
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, ScreenWidth: this.ScreenWidth})

    }
    handleClick(item: INavbarData): void{
      
      if(!this.multiple){
        for(let modelItem of this.navData){
          if(item !== modelItem && modelItem.expanded){
            modelItem.expanded = false;
          }
        }
      }
      item.expanded = !item.expanded;
    }

    getActievClass(data: INavbarData): string{
      return this.router.url.includes(data.routeLink) ? 'active' : '';
    }
}

