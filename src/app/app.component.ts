import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
  standalone: true,
})
export class HelloComponent {
  @Input() name!: string;
}


class LeakTask {
  name!: string;
  id!: number;
  payload!: string;
}

const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomString(size: number): string {
  let r = '';
  for (let i = 0; i < size; i++) {
    r += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return r;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HelloComponent]
})
export class AppComponent implements OnInit {
  intId!: any;

  tasks!: LeakTask[];

  stopLeaking() {
    clearInterval(this.intId);
  }

  ngOnInit() {
    this.intId = setInterval(() => {
      this.tasks = [];
      for (let i = 0; i < 30; i++) {
        const id = Math.floor(Math.random() * 100);
        const payload = randomString(10000);
        this.tasks.push({name: `Task ${id}`, id, payload});
      }
      console.log('tap')
    }, 5_000);
  }

  taskId(index: number, task: LeakTask): number | undefined {
    return task.id;
  }
}
