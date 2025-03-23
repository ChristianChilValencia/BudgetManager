import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() { }

  async setPreference(key: string, value: any) {
    await Preferences.set({ key, value });
  }

  async getPreference(key: string) {
    const { value } = await Preferences.get({ key });
    return value;
  }
}
