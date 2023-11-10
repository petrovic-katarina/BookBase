import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 1;
  @Input() pageSize: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onLoadMore(newPageSize: number) {
    this.pageChange.emit(newPageSize);
  }

}
