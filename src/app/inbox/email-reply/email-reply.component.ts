import { Component, Input, OnChanges } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnChanges {
  @Input() email!: Email;
  showModal = false;

  constructor(private emailService: EmailService) {}

  ngOnChanges() {
    const text = this.email.text.replace(/\n/gi, '\n>');
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `Re: ${this.email.subject}`,
      text: `\n\n\n-----${this.email.from} wrote:\n${text}`,
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
