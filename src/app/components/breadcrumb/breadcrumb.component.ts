import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  @Input() title!: string;
  @Input() items!: any[];
  @Input() active_item!: string;

  constructor() {}

  ngOnInit() {}
}
