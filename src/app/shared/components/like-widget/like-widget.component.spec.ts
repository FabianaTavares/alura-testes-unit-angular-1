import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LikeWidgetComponent } from './like-widget.component';

describe('LikeWidgetComponent', () => {
  let component: LikeWidgetComponent;
  let fixture: ComponentFixture<LikeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LikeWidgetComponent
      ],
      imports: [FontAwesomeModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID when (@Input id) property is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  //output properties forma 1.
  it(`#${LikeWidgetComponent.prototype.like.name} Should trigger (@Output liked) when called 1`, () => {
    fixture.autoDetectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
    });
    component.like();
  });

  //output properties forma 2.
  it(`#${LikeWidgetComponent.prototype.like.name} Should trigger (@Output liked) when called 2`, done => {
    fixture.autoDetectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });
    component.like();
  });

  //output properties forma 3.
  it(`#${LikeWidgetComponent.prototype.like.name} Should trigger (@Output liked) when called 3`, () => {
    spyOn(component.liked, 'emit');
    fixture.autoDetectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });

});
