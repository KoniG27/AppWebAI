import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private storageKey = 'userProfile';
  private historyKey = 'userHistory';

  saveProfile(profile: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(profile));
  }

  getProfile(): any {
    const profile = localStorage.getItem(this.storageKey);
    return profile ? JSON.parse(profile) : null;
  }
  deleteProfile(): void {
    localStorage.removeItem(this.storageKey);
  }
  saveHistory(entry: string): void {
    let history = this.getHistory();
    history.push({ entry, timestamp: new Date() });
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  getHistory(): any[] {
    const history = localStorage.getItem(this.historyKey);
    return history ? JSON.parse(history) : [];
  }

  deleteHistory(): void {
    localStorage.removeItem(this.historyKey);
  }
}
export default ProfileService;
