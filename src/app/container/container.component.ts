import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  @Input() collapsed = false;
  @Input() ScreenWidth = 0;
  getBodyClass(): string{
    let styleClass = '';
    if (this.collapsed && this.ScreenWidth > 768){
      styleClass = 'Body-trimmed';
    }else if(this.collapsed && this.ScreenWidth <= 768 && this.ScreenWidth > 0){
      styleClass = 'Body-md-screen';
    }
    return styleClass;
  }
}