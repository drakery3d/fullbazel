import {HttpClientModule} from '@angular/common/http'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {RouterTestingModule} from '@angular/router/testing'
import {ServiceWorkerModule} from '@angular/service-worker'
import {provideMockStore} from '@ngrx/store/testing'

import {ENVIRONMENT, prod} from '@client/environment'
import {SharedModule} from '@client/shared'
import {SnackbarModule} from '@libs/ui-elements'

import {HomeComponent} from './home.component'

// TODO test in more depth

describe('HomeComponent', () => {
  let comp: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        SnackbarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
      ],
      declarations: [HomeComponent],
      providers: [
        provideMockStore({initialState: {auth: {user: undefined}}}),
        {provide: ENVIRONMENT, useValue: prod},
      ],
    })
    await TestBed.compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    comp = fixture.componentInstance
  })

  it('renders title', () => {
    fixture.detectChanges()
    const h1: HTMLElement = fixture.debugElement.query(By.css('h1')).nativeElement
    expect(h1.textContent).toEqual('Fullstack Bazel')
  })

  it('renders tags', () => {
    const tags: HTMLElement = fixture.debugElement.query(By.css('.tags')).nativeElement
    fixture.detectChanges()
    comp.tags.forEach((tag, index) => {
      const child = tags.children.item(index)
      if (!child) throw new Error()
      expect(child.textContent).toEqual(tag)
    })
  })
})
