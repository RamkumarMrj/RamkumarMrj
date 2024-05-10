import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {

  data: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataSourceService) {
    iconRegistry.addSvgIcon('education', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/education.svg'));
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
