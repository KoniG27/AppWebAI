import { Component } from '@angular/core';
import { ParaphrasingService } from './chat-gpt.service';
import { catchError, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ErrorResponse, ChatResponse } from './models/chat-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userMessage = '';
  paraphrasedMessage = '';
  correctedMessage = '';
  mode = 'paraphrase';  // Modo inicial
  historyItems = [
    { name: 'Privacy Policy.pdf', link: '#' },
    { name: 'Terms of Service.pdf', link: '#' },
    { name: 'Non-disclosure Agreement.pdf', link: '#' },
    { name: 'Equipment Agreement.pdf', link: '#' }
  ];
  constructor(private paraphrasingService: ParaphrasingService) {}

  setMode(mode: string): void {
    this.mode = mode;
    this.clearMessages();
  }

  clearMessages(): void {
    this.userMessage = '';
    this.paraphrasedMessage = '';
    this.correctedMessage = '';
  }

  sendParaphrase(event: Event, message: string): void {
    event.preventDefault();
    if (!message.trim()) return;

    this.paraphrasingService
      .paraphraseMessage(message)
      .pipe(
        take(1),
        tap((response: ChatResponse) => {
          this.paraphrasedMessage = response.choices[0].message.content;
        }),
        catchError((error) => this.handleError(error))
      )
      .subscribe();
  }

  sendGrammarCheck(event: Event, message: string): void {
    event.preventDefault();
    if (!message.trim()) return;

    this.paraphrasingService
      .checkGrammar(message)
      .pipe(
        take(1),
        tap((response: ChatResponse) => {
          this.correctedMessage = response.choices[0].message.content;
        }),
        catchError((error) => this.handleError(error))
      )
      .subscribe();
  }

  private handleError(error: ErrorResponse): Observable<unknown> {
    const errorMessage = error.error?.message ? `Error: ${error.error.message}` : 'An unknown error occurred.';
    if (this.mode === 'paraphrase') {
      this.paraphrasedMessage = errorMessage;
    } else {
      this.correctedMessage = errorMessage;
    }
    return of(null);
  }
}
