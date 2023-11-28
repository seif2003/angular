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
        id: 'home',
        title: 'Home',
        type: 'item',
        classes: 'nav-item',
        url: '/home',
        icon: 'ti ti-home',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'courses',
    title: 'Courses',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: '1',
        title: 'Course title',
        type: 'item',
        classes: 'nav-item',
        url: '/course/1',
        icon: 'ti ti-typography'
      },
      {
        id: '1',
        title: 'Course title',
        type: 'item',
        classes: 'nav-item',
        url: '/course/1',
        icon: 'ti ti-typography'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
