import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
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
  currentYear: number = new Date().getFullYear();
  isDarkMode = false;
  private iconPath: string = "assets/icons";

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(APP_BASE_HREF) private baseHref: string,
    private dataService: DataSourceService,
    private renderer: Renderer2
  ) {
    this.registerIcons();
  }

  ngOnInit(): void {
    this.getResume();
    this.loadBlogPosts();
    
    // Only use dark mode if explicitly saved as 'dark'
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          this.setDarkMode(true);
        }
      } catch (e) {
        console.warn('LocalStorage not accessible:', e);
      }
    }
  }

  toggleDarkMode() {
    this.setDarkMode(!this.isDarkMode);
    console.log('Dark mode toggled to:', this.isDarkMode);
  }

  setDarkMode(isDark: boolean) {
    this.isDarkMode = isDark;
    if (typeof document !== 'undefined') {
      try {
        if (isDark) {
          this.renderer.addClass(document.documentElement, 'dark');
          this.renderer.addClass(document.body, 'dark');
          localStorage.setItem('theme', 'dark');
        } else {
          this.renderer.removeClass(document.documentElement, 'dark');
          this.renderer.removeClass(document.body, 'dark');
          localStorage.setItem('theme', 'light');
        }
      } catch (e) {
        console.warn('Could not set theme:', e);
      }
    }
  }

  formatName(name: string | undefined): string {
    if (!name) return '';
    return name.toUpperCase().replace(/\s+/g, '_');
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

  loadBlogPosts() {
    this.dataService.getBlogPosts().subscribe((posts) => {
      const mappedPosts = (posts || []).map(p => ({
        ...p,
        image: p.image || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800`
      }));
      if (this.data) {
        this.data.blogs = mappedPosts;
      } else {
        const interval = setInterval(() => {
          if (this.data) {
            this.data.blogs = mappedPosts;
            clearInterval(interval);
          }
        }, 100);
      }
    });
  }
}
