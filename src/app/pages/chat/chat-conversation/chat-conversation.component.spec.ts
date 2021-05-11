import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConversationComponent } from './chat-conversation.component';

describe('ChatConversationComponent', () => {
  let component: ChatConversationComponent;
  let fixture: ComponentFixture<ChatConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
