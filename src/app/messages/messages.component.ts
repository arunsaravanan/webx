import { AfterViewChecked, Component, OnChanges, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Logout } from '../store/auth';
import { Spinner } from '../store/spinner';
import { CreateMessage, DeleteMessage, selectedMessages } from '../store/messages';
import * as fromStore from './../store';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollContent') private scrollContainer: any;
  disableScrollDown = false;

  textMessage: string = "";
  constructor(
      private store: Store<fromStore.State>,
      private sanitizer: DomSanitizer,
      private toastr: ToastrService
    ) { }

  messages$ = this.store.select(selectedMessages);

  ngOnInit(): void {

    this.messages$ = this.store.pipe(select(fromStore.selectedMessages));
    this.scrollToBottom();
    //this.toastr.success('Logged in successfully!', 'Webex Messages', { closeButton: true });
  }
  createMessage() {
    if (this.textMessage != "") {
      this.store.dispatch(new Spinner({ isLoading: true }));
      this.store.dispatch(new CreateMessage({ message: this.textMessage }));
      this.textMessage = "";
    }
  }

  deleteMessage(message: any) {
    this.store.dispatch(new Spinner({ isLoading: true }));
    this.store.dispatch(new DeleteMessage({ message: message }));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onScroll() {
    let element = this.scrollContainer.nativeElement;
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    this.disableScrollDown = !atBottom;
  }
  scrollToBottom(): void {
    this.onScroll();
    if (this.disableScrollDown) {
      return
    }
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight -  this.scrollContainer.nativeElement.clientHeight;
    } catch (err) { }
  }

}
