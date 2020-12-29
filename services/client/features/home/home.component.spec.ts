import {ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'

import {HomeComponent} from './home.component'

describe('HomeComponent', () => {
  let comp: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({declarations: [HomeComponent]})
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
      expect(tags.children.item(index)!.textContent).toEqual(tag)
    })
  })
})
