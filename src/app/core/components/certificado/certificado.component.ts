import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.scss',
})
export class CertificadoComponent implements OnInit {

  @Input() type: string = 'com_certificado';
  ngOnInit(): void {}


}
