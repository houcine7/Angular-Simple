import { Component } from '@angular/core';

type comment = {
  id: number;
  message: string;
};

type User = {
  name: string;
  username: string;
  phone: string;
};

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  comments: comment[] = [];
  user: User = {
    name: 'houcine el adaaa',
    username: 'houcine7',
    phone: '0641848699',
  };

  comment: comment = { id: 0, message: '' };

  addComment = (): void => {
    console.log('calllled');

    if (this.comment.message != '') {
      this.comment.id = this.comments.length + 1;
      this.comments.push({
        id: this.comment.id,
        message: this.comment.message,
      });

      this.comment.message = '';
    }
  };
}
