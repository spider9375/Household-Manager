import { Component, inject } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TagsService } from './service/tags.service';
import { ThemeService } from '../core/theme/theme.service';
import { ITag } from './models/tag.model';
import { TagComponent } from './tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    MatSidenav, 
    MatSidenavContainer, 
    MatSidenavContent, 
    RouterModule,
    TagComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  service = inject(TagsService);
  themeService = inject(ThemeService);
  loading: boolean = true;
  tags: ITag[] = [];

  public ngOnInit(){
    this.getCategories();
  }
  private getCategories(): void {
    this.service.getCategories().subscribe(tags => {
        this.tags = tags
        this.loading = false;
    });
}
}
