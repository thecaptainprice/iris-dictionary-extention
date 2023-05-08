import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'iris-dictionary-extention';
  closeExtension(): void {
    chrome.runtime.sendMessage({ type: 'close_extension' });
  }
}
