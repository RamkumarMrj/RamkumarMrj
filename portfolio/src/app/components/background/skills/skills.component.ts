import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {

  data: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataSourceService) {
    iconRegistry.addSvgIcon('skills', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/skills.svg'));
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
