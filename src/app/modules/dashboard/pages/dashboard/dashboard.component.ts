import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeService } from 'src/app/core/services/theme.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  options: EChartsOption = {};
  theme: string = '';
  loader = false;
  constructor(
    private readonly themeService: ThemeService,
    private readonly dashboardService: DashboardService,
  ) {
    this.themeService.chartTheme.subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnInit(): void {}
}
