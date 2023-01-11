import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe((email) => {
    //     console.log(email);
    //   });
    // });

    this.route.params
      .pipe(
        switchMap(({ id }) => {
          return this.emailService.getEmail(id);
        })
      )
      .subscribe((email) => console.log(email));
  }
}
