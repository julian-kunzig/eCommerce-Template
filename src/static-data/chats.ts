import { DateTime } from 'luxon';
import { Chat } from '../app/pages/chat/chat.component';

export const chats: Chat[] = [
    {
        id: 1,
        imageSrc: 'assets/img/avatars/profile-photo-01.png',
        from: 'Kaitlyn Kristy',
        status: 'Online',
        message: 'You did great with the last presentation, looking forward to working with you on the next project.',
        unreadCount: 0,
        timestamp: DateTime.local().minus({ minutes: 10 }).toRelative()
    },
    {
        id: 2,
        imageSrc: 'assets/img/avatars/profile-photo-02.png',
        from: 'Carla Houston',
        status: 'last seen: 2 hours ago',
        message: 'Great, thanks a lot! 👌',
        unreadCount: 1,
        timestamp: DateTime.local().minus({ minutes: 54 }).toRelative()
    },
    {
        id: 3,
        imageSrc: 'assets/img/avatars/profile-photo-03.png',
        from: 'Samantha Smith',
        status: 'last seen: 5 hours ago',
        message: 'Sure! I\'ll remind you tomorrow, hope we can get this ready!',
        unreadCount: 0,
        timestamp: DateTime.local().minus({ hours: 2 }).toRelative()
    },
    {
        id: 4,
        imageSrc: 'assets/img/avatars/profile-photo-04.png',
        from: 'Mocha',
        status: 'Online',
        message: 'Thanks! 👍👍👍',
        unreadCount: 0,
        timestamp: DateTime.local().minus({ hours: 8 }).toRelative()
    },
];
