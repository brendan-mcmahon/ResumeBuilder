import { Component } from '@angular/core';
import { Resume, Header } from '../resume-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  resume: Resume = {
    header: {
      title: 'Brendan McMahon',
      subtitle: 'Software Developer',
      sidebar: ['brendanjeffreymcmahon@gmail.com', '317.361.7130']
    },
    sections: [
      {
        title: 'Experience',
        subsections: [
          {
            title: 'Seven Corners',
            subtitle: 'Software Developer II',
            items: [
              'Full Stack C# .NET development',
              'Sitefinity CMS',
              'Scrum-based Agile workflow',
              'Test-Driven Development using Moq and MSTest Framework'
            ],
            sidebar: 'Jun 2016 - Present'
          },
          {
            title: 'Orange Business Services',
            subtitle: 'Associate Account Manager',
            items: [
              'Maintain and manage enterprise customer relationships',
              'Manage the quote-to-order process',
              'Liaison between customer and internal technical team'
            ],
            sidebar: 'Oct 2014 - Nov 2015'
          }
        ]
      },

      {
        title: 'Projects',
        subsections: [
          {
            title: 'Mood App',
            subtitle: 'Team Morale Tracker Web App',
            items: [
              '.Net Core 2.0 / EFCore',
              'SendGrid',
              'Azure Webjob'
            ],
            sidebar: null
          },
          {
            title: 'Budget Calendar',
            subtitle: 'Financial Tracking Web App',
            items: [
              'Angular 5.0',
              '.Net Core WebAPI'
            ],
            sidebar: null
          },
          {
            title: 'Marital Bliss',
            subtitle: 'Card Game Mobile App',
            items: [
              'React Native',
              '.Net Core WebAPI'
            ],
            sidebar: null
          },
          {
            title: 'Temporal Expressions*',
            subtitle: 'Fluent Date Scheduling .Net Standard Library',
            items: [
              'Nuget Packaging',
              '.Net Standard'
            ],
            sidebar: null
          },
          {
            title: 'Resume App*',
            subtitle: 'Resume Layout Builder Web App',
            items: [
              'Angular 5.0'
            ],
            sidebar: null
          }
        ]
      },

      {
        title: 'Education',
        subsections: [
          {
            title: 'Ball State University',
            subtitle: 'Master of Information and Communication Sciences',
            items: [],
            sidebar: 'Graduated 2014'
          },
          {
            title: 'Butler University',
            subtitle: 'Music Theory and Composition, Minor Computer Science',
            items: [],
            sidebar: 'Graduated 2013'
          }
        ]
      }
    ],
    footer: {
      items: ['*Available on GitHub: https://github.com/brendan-mcmahon']
    }
  };
}
