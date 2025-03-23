import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  incomeInput: number | null = null;
  needs: number | null = null;
  wants: number | null = null;
  savings: number | null = null;

  async budget(){
    if(this.incomeInput === null){
      this.needs = null;
      this.wants = null;
      this.savings = null;
    }
    else{
      this.needs = this.incomeInput * 0.5;
      this.wants = this.incomeInput * 0.3;
      this.savings = this.incomeInput * 0.2;

      await this.settingsService.setPreference('incomeInput', this.incomeInput);
      await this.settingsService.setPreference('needs', this.needs);
      await this.settingsService.setPreference('wants', this.wants);
      await this.settingsService.setPreference('savings', this.savings);
    }
  }

  async reset(){
    this.incomeInput = null;
    this.needs = null;
    this.wants = null;
    this.savings = null;
    await this.settingsService.setPreference('incomeInput', null);
    await this.settingsService.setPreference('needs', null);
    await this.settingsService.setPreference('wants', null);
    await this.settingsService.setPreference('savings', null);
  }

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.loadSettings();
  }

  async loadSettings() {
    const incomeInputString = await this.settingsService.getPreference('incomeInput');
    this.incomeInput = incomeInputString !== null ? parseFloat(incomeInputString) : null;
    const needsString = await this.settingsService.getPreference('needs');
    this.needs = needsString !== null ? parseFloat(needsString) : null;
    const wantsString = await this.settingsService.getPreference('wants');
    this.wants = wantsString !== null ? parseFloat(wantsString) : null;
    const savingsString = await this.settingsService.getPreference('savings');
    this.savings = savingsString !== null ? parseFloat(savingsString) : null;
  }
}