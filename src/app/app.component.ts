import { Component } from '@angular/core';
import { ParaphrasingService } from './chat-gpt.service';
import { catchError, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ErrorResponse, ChatResponse } from './models/chat-response.model';
import { ProfileService } from './profile.service';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mode = 'paraphrase';  // Modo inicial
  userMessage = '';
  paraphrasedMessage = '';
  correctedMessage = '';
  translatedMessage = '';
  targetLanguage = 'en';
  historyItems: any[] = [];

  profile = {
    displayName: '',
    email: '',
    phone: '',
    dob: '',
    country: '',
    address: '',
  };

 
  constructor(private paraphrasingService: ParaphrasingService,
  private profileService: ProfileService,
  private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadHistory();
  }
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
      this.profileService.saveHistory(`Parafraseado: ${message}`);
      this.loadHistory();
  }
  
  saveProfile(): void {
    this.profileService.saveProfile(this.profile);
    console.log('Perfil guardado', this.profile);
    alert('Perfil guardado exitosamente.');
  }

  loadProfile(): void {
    const savedProfile = this.profileService.getProfile();
    if (savedProfile) {
      this.profile = savedProfile;
    }
  }
  deleteProfile(): void {
    this.profileService.deleteProfile();
    console.log('Perfil borrado');
    alert('Perfil borrado exitosamente.');
    this.resetProfile();
  }

  resetProfile(): void {
    this.profile = {
      displayName: '',
      email: '',
      phone: '',
      dob: '',
      country: '',
      address: '',
    };
  }
  loadHistory(): void {
    this.historyItems = this.profileService.getHistory();
  }

  deleteHistory(): void {
    this.profileService.deleteHistory();
    this.loadHistory();
    console.log('Historial borrado');
    alert('Historial borrado exitosamente.');
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
      this.profileService.saveHistory(`Grammar Checker: ${message}`);
      this.loadHistory();
  }
  translateMessage(event: Event, message: string): void {
    event.preventDefault();
    if (!message.trim()) return;

    this.translationService.translate(message, this.targetLanguage).subscribe(
      response => {
        this.translatedMessage = response.choices[0].message.content;
        this.profileService.saveHistory(`Traducido: ${message} -> ${this.translatedMessage}`);
        this.loadHistory();
      },
      error => {
        console.error('Error al traducir el mensaje', error);
        alert('Hubo un error al traducir el mensaje.');
      }
    );
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
