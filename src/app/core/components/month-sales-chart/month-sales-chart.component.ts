import { Component, Input, OnInit, HostListener } from '@angular/core';
import { VendasCaixinhasService } from '../../../services/vendasCaixinhas.service';

@Component({
  selector: 'app-monthly-sales-chart',
  templateUrl: './month-sales-chart.component.html',
  styleUrls: ['./month-sales-chart.component.scss']
})
export class MonthSalesChartComponent implements OnInit {
  @Input() year: number = new Date().getFullYear();
  chartData: any[] = [];
  view: [number, number] = [window.innerWidth * 0.9, 300]; 

  constructor(private vendasCaixinhasService: VendasCaixinhasService) {}

  ngOnInit(): void {
    this.getMonthlySales(this.year);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [event.target.innerWidth * 0.85, 300]; 
  }

  getMonthlySales(year: number): void {
    this.vendasCaixinhasService.getMonthlySales(year).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const monthlySales = response.data.monthlySales;
          this.chartData = monthlySales.map((monthData: any) => ({
            name: `Mês ${monthData.month}`,
            value: monthData.totalSales,
          }));
        }
      },
      error: (error) => console.error('Erro ao carregar vendas mensais:', error),
    });
  }
}
