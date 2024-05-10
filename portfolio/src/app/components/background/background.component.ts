import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent implements OnInit {

  data: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataSourceService) {
    iconRegistry.addSvgIcon('about', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/about.svg'));
  }

  ngOnInit(): void {
    this.getResume();
  }

  getResume() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    })
  }

}
