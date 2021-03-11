import {ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {RouterTestingModule} from '@angular/router/testing'
import {ServiceWorkerModule} from '@angular/service-worker'
import {provideMockStore} from '@ngrx/store/testing'

import {ENVIRONMENT, prod} from '@client/environment'
import {SharedModule} from '@client/shared'

import {DocsComponent} from './docs.component'

// TODO test in more depth

describe('DocsComponent', () => {
  let fixture: ComponentFixture<DocsComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [DocsComponent],
      providers: [
        provideMockStore({initialState: {auth: {user: undefined}}}),
        {provide: ENVIRONMENT, useValue: prod},
      ],
    })
    await TestBed.compileComponents()

    fixture = TestBed.createComponent(DocsComponent)
  })

  it('renders title', () => {
    fixture.detectChanges()
    const h1: HTMLElement = fixture.debugElement.query(By.css('h1')).nativeElement
    expect(h1.textContent).toEqual('Docs')
  })
})
