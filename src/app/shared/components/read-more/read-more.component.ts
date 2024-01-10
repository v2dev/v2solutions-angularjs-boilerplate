import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
})
export class ReadMoreComponent {
  @Input() content!: string;
  @Input() contentLength: number = 50;
  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }
}
