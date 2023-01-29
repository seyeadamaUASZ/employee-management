import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const listItems = document.querySelectorAll('.sidebar-list li');

    listItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            listItems.forEach(el => {
                el.classList.remove('active');
            });

            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const logo = document.querySelector('.logo-box');
    const sidebar = document.querySelector('.sidebar');
    const home = document.querySelector('.home');

    if (toggleSidebar && logo && sidebar && home) {
        toggleSidebar.addEventListener('click', () => {
            sidebar.classList.toggle('close');
            home.classList.toggle('close');
        });

        logo.addEventListener('click', () => {
            sidebar.classList.toggle('close');
            home.classList.toggle('close');
        });
    }
}

}
