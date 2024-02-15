import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { navDataBar } from './nav-Data';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  onToggleSideNav: any;
  NavShow: boolean = true;

  constructor(private router: Router) {}
  
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  isSginUpPage(): boolean {
    return this.router.url === '/signup';
  }
  NavHidd(){
    this.NavShow = false;
  }

   ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavVisibility();
      }
    });
    
  }
  updateNavVisibility() {
    this.NavShow = !this.router.url.includes('/login');
    this.NavShow = !this.router.url.includes('/signup');
    this.NavShow = !this.router.url.includes('/dashboard');
  }
  ScreenWidth: number | undefined;
  collapsed = true;
  navData = navDataBar;
  show = true;

  toggleNavbar() {
    this.show = !this.show;
  }

  @HostListener('window: resize', ['$event'])
    onResize(event: any){
      this.ScreenWidth = window.innerWidth;
      if(this.ScreenWidth <= 992){
        this.collapsed =true;
      }else{
        this.collapsed =false;
      }
    }
}
