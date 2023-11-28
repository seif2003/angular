import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'home',
    title: 'Home',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: "home",
        title: "Home",
        type: "item",
        classes: "nav-item",
        url: "/home",
        icon: "ti ti-home",
        breadcrumbs: false
      },
      {
        id: "admin",
        title: "Admin",
        type: "item",
        classes: "nav-item",
        url: "/admin",
        icon: "ti ti-user",
        breadcrumbs: false
      },
      {
        id: "add-course",
        title: "Add Course",
        type: "item",
        classes: "nav-item",
        url: "/course/add",
        icon: "ti ti-plus",
        breadcrumbs: false
      }
    ]    
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
