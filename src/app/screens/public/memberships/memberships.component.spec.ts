import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MembershipsComponent } from './memberships.component';
import { of } from 'rxjs';

describe('MembershipsComponent', () => {
  let component: MembershipsComponent;
  let fixture: ComponentFixture<MembershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            snapshot: { paramMap: { get: () => '123' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
