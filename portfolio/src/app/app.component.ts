import { Component, Inject, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataSourceService } from './services/data-source.service';
import { APP_BASE_HREF } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Ramkumar Murthy';
  data: any;
  private iconPath: string = "assets/icons";

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(APP_BASE_HREF) private baseHref: string,
    private dataService: DataSourceService
  ) {
    this.registerIcons();
  }

  ngOnInit(): void {
    this.getResume();
  }

  private registerIcons(): void {
    // About/Background icons
    this.iconRegistry.addSvgIcon('about', this.setPath(`${this.iconPath}/about.svg`));
    this.iconRegistry.addSvgIcon('work', this.setPath(`${this.iconPath}/work.svg`));
    this.iconRegistry.addSvgIcon('projects', this.setPath(`${this.iconPath}/projects.svg`));
    this.iconRegistry.addSvgIcon('skills', this.setPath(`${this.iconPath}/skills.svg`));
    this.iconRegistry.addSvgIcon('certificates', this.setPath(`${this.iconPath}/certificates.svg`));
    this.iconRegistry.addSvgIcon('education', this.setPath(`${this.iconPath}/education.svg`));
    this.iconRegistry.addSvgIcon('references', this.setPath(`${this.iconPath}/references.svg`));
    
    // Social media icons
    this.iconRegistry.addSvgIcon('instagram', this.setPath(`${this.iconPath}/social-media/instagram.svg`));
    this.iconRegistry.addSvgIcon('twitter', this.setPath(`${this.iconPath}/social-media/twitter-x.svg`));
    this.iconRegistry.addSvgIcon('github', this.setPath(`${this.iconPath}/social-media/github.svg`));
    this.iconRegistry.addSvgIcon('pinterest', this.setPath(`${this.iconPath}/social-media/pinterest.svg`));
    this.iconRegistry.addSvgIcon('threads', this.setPath(`${this.iconPath}/social-media/threads.svg`));
    this.iconRegistry.addSvgIcon('medium', this.setPath(`${this.iconPath}/social-media/medium.svg`));
    this.iconRegistry.addSvgIcon('dev.to', this.setPath(`${this.iconPath}/social-media/dev-to.svg`));
    this.iconRegistry.addSvgIcon('stackoverflow', this.setPath(`${this.iconPath}/social-media/stack-overflow.svg`));
    this.iconRegistry.addSvgIcon('linkedin', this.setPath(`${this.iconPath}/social-media/linkedin.svg`));
    this.iconRegistry.addSvgIcon('facebook', this.setPath(`${this.iconPath}/social-media/facebook.svg`));
    
    // Utility icons
    this.iconRegistry.addSvgIcon('download', this.setPath(`${this.iconPath}/download.svg`));
    this.iconRegistry.addSvgIcon('open-link', this.setPath(`${this.iconPath}/open-link.svg`));
  }

  private setPath(url: string): SafeResourceUrl {
    // In components, the path was "../../assets/icons", here it is "assets/icons"
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.baseHref + url)
  }

  getResume() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
