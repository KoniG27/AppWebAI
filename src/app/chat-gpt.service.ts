import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatResponse } from './models/chat-response.model';

@Injectable({
  providedIn: 'root'
})
export class ParaphrasingService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  paraphraseMessage(message: string): Observable<ChatResponse> {
    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a paraphrasing assistant.' },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.chatGptApiKey}`
    };

    return this.http.post<ChatResponse>(this.apiUrl, body, { headers });
  }

  checkGrammar(message: string): Observable<ChatResponse> {
    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a grammar correction assistant.' },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.chatGptApiKey}`
    };

    return this.http.post<ChatResponse>(this.apiUrl, body, { headers });
  }
}
