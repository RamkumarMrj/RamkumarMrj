import { Component, Inject, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataSourceService } from '../../services/data-source.service';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  data: any;
  private path: string = "../../assets/icons";

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(APP_BASE_HREF) private baseHref: string,
    private dataService: DataSourceService
  ) {
    // this.iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/social-media/instagram.svg'));
    this.iconRegistry.addSvgIcon('instagram', this.setPath(`${this.path}/social-media/instagram.svg`));
    this.iconRegistry.addSvgIcon('twitter', this.setPath(`${this.path}/social-media/twitter-x.svg`));
    this.iconRegistry.addSvgIcon('github', this.setPath(`${this.path}/social-media/github.svg`));
    this.iconRegistry.addSvgIcon('pinterest', this.setPath(`${this.path}/social-media/pinterest.svg`));
    this.iconRegistry.addSvgIcon('threads', this.setPath(`${this.path}/social-media/threads.svg`));
    this.iconRegistry.addSvgIcon('medium', this.setPath(`${this.path}/social-media/medium.svg`));
    this.iconRegistry.addSvgIcon('dev.to', this.setPath(`${this.path}/social-media/dev-to.svg`));
    this.iconRegistry.addSvgIcon('stackoverflow', this.setPath(`${this.path}/social-media/stack-overflow.svg`));
    this.iconRegistry.addSvgIcon('linkedin', this.setPath(`${this.path}/social-media/linkedin.svg`));
    this.iconRegistry.addSvgIcon('facebook', this.setPath(`${this.path}/social-media/facebook.svg`));
    this.iconRegistry.addSvgIcon('download', this.setPath(`${this.path}/download.svg`));
    this.iconRegistry.addSvgIcon('open-link', this.setPath(`${this.path}/open-link.svg`));

  }

  private setPath(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.baseHref + url)
  }

  ngOnInit(): void {
    this.getResume();
  }

  getResume() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    })
  }

  // downloadPdf(): void {
  //   this.dataService.downloadPdf();
  // }
  

}
