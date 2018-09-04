import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DatatableComponent as SuperDataTablePagerComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-datatable-pager',
  template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a
          href="javascript:void(0)"
          (click)="selectPage(1)">
          <i class="{{pagerPreviousIcon}}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a
          href="javascript:void(0)"
          (click)="prevPage()">
          <i class="{{pagerLeftArrowIcon}}"></i>
        </a>
      </li>
      <li
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page">
        <a
          href="javascript:void(0)"
          (click)="selectPage(pg.number)">
          {{pg.text}}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a
          href="javascript:void(0)"
          (click)="nextPage()">
          <i class="{{pagerRightArrowIcon}}"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a
          href="javascript:void(0)"
          (click)="selectPage(totalPages)">
          <i class="{{pagerNextIcon}}"></i>
        </a>
      </li>
    </ul>
  `,
  host: {
    class: 'datatable-pager'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent extends SuperDataTablePagerComponent {
//   @Input() pagerLeftArrowIcon: string = 'icon-left';
//   @Input() pagerRightArrowIcon: string = 'icon-right';
//   @Input() pagerPreviousIcon: string = 'icon-prev';
//   @Input() pagerNextIcon: string = 'icon-skip';

  @Input()
  set size(val: number) {
    this._size = val;
    this.pages = this.calcPages();
  }

  get size(): number {
    return this._size;
  }

  @Input()
  set count(val: number) {
    this._count = val;
    this.pages = this.calcPages();
  }

  get count(): number {
    return this._count;
  }

  @Input()
  set page(val: number) {
    this._page = val;
    this.pages = this.calcPages();
  }

  get page(): number {
    return this._page;
  }

  get totalPages(): number {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(count || 0, 1);
  }

  @Output() change: EventEmitter<any> = new EventEmitter();

  public _visiblePagesCount: number = 3;

  @Input()
  set visiblePagesCount(val: number) {
    this._visiblePagesCount = val;
    this.pages = this.calcPages();
  }

  get visiblePagesCount(): number {
    return this._visiblePagesCount;
  }

  _count: number = 0;
  _page: number = 1;
  _size: number = 0;
  pages: any;

  canPrevious(): boolean {
    return this.page > 1;
  }

  canNext(): boolean {
    return this.page < this.totalPages;
  }

  prevPage(): void {
    this.selectPage(this.page - 1);
  }

  nextPage(): void {
    this.selectPage(this.page + 1);
  }

  selectPage(page: number): void {
    if (page > 0 && page <= this.totalPages && page !== this.page) {
      this.page = page;

      this.change.emit({
        page
      });
    }
  }

  calcPages(page?: number): any[] {
    const pages = [];
    let startPage = 1;
    let endPage = this.totalPages;
    const maxSize = this.visiblePagesCount;
    const isMaxSized = maxSize < this.totalPages;

    page = page || this.page;

    if (isMaxSized) {
      startPage = page - Math.floor(maxSize / 2);
      endPage = page + Math.floor(maxSize / 2);

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
      } else if (endPage > this.totalPages) {
        startPage = Math.max(this.totalPages - maxSize + 1, 1);
        endPage = this.totalPages;
      }
    }

    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: <string><any>num
      });
    }

    return pages;
  }
}
