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
  customColors: any[] = [];
  isLoading: boolean = true; 
  hasData: boolean = false;

  constructor(private vendasCaixinhasService: VendasCaixinhasService) {}

  ngOnInit(): void {
    this.updateChartColors();
    this.getMonthlySales(this.year);

    const observer = new MutationObserver(() => {
      this.updateChartColors();
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [event.target.innerWidth * 0.85, 300];
  }

  getMonthlySales(year: number): void {
    this.isLoading = true; 
    this.hasData = false; 

    this.vendasCaixinhasService.getMonthlySales(year).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const monthlySales = response.data.monthlySales;

          if (monthlySales && monthlySales.length > 0) {
            this.chartData = [
              {
                name: 'Faturamento',
                series: monthlySales.map((monthData: any) => ({
                  name: `Mês ${monthData.month}`,
                  value: monthData.totalSales,
                })),
              },
            ];
            this.hasData = true; 
          } else {
            this.chartData = [];
            this.hasData = false;
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar vendas mensais:', error);
        this.chartData = [];
        this.hasData = false;
      },
      complete: () => {
        this.isLoading = false; 
      },
    });
  }

  updateChartColors(): void {
    const isDarkMode = document.body.classList.contains('dark-theme');
    this.customColors = [
      { name: 'Faturamento', value: isDarkMode ? '#ffffff' : '#000000' },
    ];
  }

  formatYAxisTicks(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
