import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCompletePage } from './profile-complete.page';

describe('ProfileCompletePage', () => {
  let component: ProfileCompletePage;
  let fixture: ComponentFixture<ProfileCompletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
