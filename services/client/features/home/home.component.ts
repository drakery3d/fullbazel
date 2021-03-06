import {Component} from '@angular/core'

import {Tags} from '@libs/enums'

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="logo">
        <path style="fill:#76D275;" d="M144 32 l112 112 -112 112 l-112 -112z" />
        <path style="fill:#43A047;" d="M32 144 v112 l112 112 v-112z" />
        <path style="fill:#76D275;" d="M368 32  l112 112 -112 112 -112 -112z" />
        <path style="fill:#43A047;" d="M480 144 v112 l-112 112 v-112z" />
        <path style="fill:#43A047;" d="M256 144 l112 112 -112 112 -112 -112z" />
        <path style="fill:#00701A;" d="M256 368 v112 l-112 -112  v-112z" />
        <path style="fill:#004300;" d="M256 368 l112 -112 v112 l-112 112z" />
      </svg>

      <h1>Fullstack Bazel</h1>
      <p>Let's build something great!</p>
      <span class="line"></span>
      <div class="tags">
        <span *ngFor="let tag of tags">{{ tag }}</span>
      </div>
      <a routerLink="/realtime"><app-button>Realtime</app-button></a>
    </div>
  `,
  styleUrls: ['home.component.sass'],
})
export class HomeComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags = Object.keys(Tags).map(key => (Tags as any)[key])
}
