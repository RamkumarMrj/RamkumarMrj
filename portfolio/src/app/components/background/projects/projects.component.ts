import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  data: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataSourceService) {
    iconRegistry.addSvgIcon('projects', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/projects.svg'));
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
