import {ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {ServiceWorkerModule} from '@angular/service-worker'
import {provideMockStore} from '@ngrx/store/testing'

import {ENVIRONMENT, prod} from '@client/environment'
import {SharedModule} from '@client/shared'

import {DiscussionsComponent} from './discussions.component'

// TODO test in more depth

describe('DiscussionsComponent', () => {
  let comp: DiscussionsComponent
  let fixture: ComponentFixture<DiscussionsComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [DiscussionsComponent],
      providers: [
        provideMockStore({initialState: {auth: {user: undefined}}}),
        {provide: ENVIRONMENT, useValue: prod},
      ],
    })
    await TestBed.compileComponents()

    fixture = TestBed.createComponent(DiscussionsComponent)
    comp = fixture.componentInstance
  })

  it('creates component', () => {
    expect(comp).toBeDefined()
  })
})
