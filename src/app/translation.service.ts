import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatResponse } from './models/chat-response.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  translate(text: string, targetLanguage: string): Observable<ChatResponse> {
    const messages = [
      { role: 'system', content: 'You are a translator.' },
      { role: 'user', content: `Translate the following text to ${targetLanguage}: "${text}"` }
    ];

    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.chatGptApiKey}`
    };

    return this.http.post<ChatResponse>(this.apiUrl, body, { headers });
  }
}
