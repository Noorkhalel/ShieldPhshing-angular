import { Component, Input, OnInit } from '@angular/core';
import { INavbarData, fadeInOut } from './helper';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sublevel-menu',
  template: `
      <ul *ngIf="collapsed && data.items && data.items.length > 0"
      [@submenu]="expanded
      ? {value: 'visible', params: {transitionParams: '400ms cubic-bezier(0.87,0,0.07,1)',height: '*'}}
      : {value: 'hidden', params: {transitionParams: '400ms cubic-bezier(0.87,0,0.07,1)',height: '0'}}
      "

      class="sublevel-nav" 
      >
        <li *ngFor="let item of data.items" Class="sublevel-nav-item">
            <a (click)="handleClick(item)" class="sublevel-nav-link"
            *ngIf="item.items && item.items.length > 0"
            [ngClass]="getActievClass(item)"
            >
              <i class="sublevel-link-icon fa fa-circle"></i>
              <span class="sublevel-link-text" @fadeInOut
               *ngIf="collapsed">{{item.label}}</span>
              <i *ngIf="collapsed && item.items" class="menu-collapse-icon"
               [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"></i>
            </a>
            <a class="sublevel-nav-link"
            *ngIf="!item.items || (item.items && item.items.length === 0)"
            [routerLink]="[item.routeLink]"
            routerLinkActive="active-sublevel"
            [routerLinkActiveOptions]="{ exact: true }">

                <i class="sublevel-link-icon fa fa-circle"></i>
                <span class="sublevel-link-text" @fadeInOut
                 *ngIf="collapsed">{{item.label}}</span>
            </a>
            <div *ngIf="item.items && item.items.length > 0">
              <app-sublevel-menu
              [data]="data"
              [collapsed]="collapsed"
              [multiple]="multiple"
              [expanded]="item.expanded"
              >
              </app-sublevel-menu>
            </div>

        </li>
    </ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations:[
    fadeInOut,
    trigger('submenu',[
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*',
      })),
        transition('visible <=> hidden', [
        style({ overflow: 'hidden' }),
        animate('{{ transitionParams }}'),
      ]),

    ])
  ]
})
export class SublevelMenuComponent implements OnInit{

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }

  @Input() collapsed = false;
  @Input() animating: boolean | undefined; 
  @Input() expanded: boolean | undefined; 
  @Input() multiple: boolean = false; 

  constructor(public router: Router){}

  ngOnInit(): void {
  }

  handleClick(item: any): void{
    if(!this.multiple){
      if(this.data.items && this.data.items.length > 0){
        for(let modelItem of this.data.items){
          if(item !==modelItem && modelItem.expanded){
            modelItem.expanded=false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
  getActievClass(item: INavbarData): string{
    return item.expanded && this.router.url.includes(item.routeLink) ? 'active-sublevel' : '';
  }
}
