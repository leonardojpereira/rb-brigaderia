import { Component, OnInit } from '@angular/core';
import { VendasCaixinhasService } from '../../../services/vendasCaixinhas.service';

@Component({
  selector: 'app-resumo-vendas-dashboard',
  templateUrl: './resumo-vendas-dashboard.component.html',
  styleUrls: ['./resumo-vendas-dashboard.component.scss']
})
export class ResumoVendasDashboardComponent implements OnInit {
  totalCusto: number = 0;
  totalLucro: number = 0;
  quantidadeVendas: number = 0;

  selectedMonth: number = new Date().getMonth() + 1; // Default to current month
  selectedYear: number = new Date().getFullYear();   // Default to current year

  monthOptions = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 }
  ];

  yearOptions = this.generateYearOptions();

  constructor(private vendasCaixinhasService: VendasCaixinhasService) {}

  ngOnInit(): void {
    // Load data for the current month and year on initialization
    this.getMonthlySalesSummary(this.selectedYear, this.selectedMonth);
  }

  generateYearOptions(): Array<{ label: string; value: number }> {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear; year++) {
      years.push({ label: year.toString(), value: year });
    }
    return years;
  }

  getMonthlySalesSummary(year: number, month: number): void {
    this.vendasCaixinhasService.getMonthlySalesSummary(year, month).subscribe(
      (response) => {
        if (response.isSuccess && response.data) {
          this.totalCusto = response.data.totalCusto;
          this.totalLucro = response.data.totalLucro;
          this.quantidadeVendas = response.data.quantidadeVendas;
        } else {
          console.error('Failed to fetch monthly sales summary:', response.errors);
        }
      },
      (error) => {
        console.error('Error fetching monthly sales summary:', error);
      }
    );
  }

  applyFilter(): void {
    // Call the service with the selected year and month
    this.getMonthlySalesSummary(this.selectedYear, this.selectedMonth);
  }
}
