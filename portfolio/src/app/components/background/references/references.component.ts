import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrl: './references.component.css'
})
export class ReferencesComponent implements OnInit {

  data: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataSourceService) {
    iconRegistry.addSvgIcon('references', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/references.svg'));
  }

  ngOnInit(): void {
      this.getResume()
  }

  getResume() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    })
  }

}
