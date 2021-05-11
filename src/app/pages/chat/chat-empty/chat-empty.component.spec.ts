import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEmptyComponent } from './chat-empty.component';

describe('ChatEmptyComponent', () => {
  let component: ChatEmptyComponent;
  let fixture: ComponentFixture<ChatEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
