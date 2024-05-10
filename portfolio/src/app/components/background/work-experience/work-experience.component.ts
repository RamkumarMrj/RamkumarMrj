import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent implements OnInit {

  data: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataSourceService) {
    iconRegistry.addSvgIcon('work', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/work.svg'));
    iconRegistry.addSvgIcon('open-link', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/open-link.svg'));
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
