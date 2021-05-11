import { Question } from '../app/pages/campaign/interfaces/question.interface';
export const qaData: Question[] = [
    {
        id: 1,
        question: 'No, the influencers don’t need to physically have the product.',
        completed: false,
    },
    {
        id: 2,
        question: 'Yes, the influencers and the product must appear on the post.',
        completed: false,
        sub_quetions: [
            {
                id: 3,
                question: 'We will send the product sample to the influencers',
                completed: false,
            },
            {
                id: 4,
                question: 'The influencers will need to return the product.',
                completed: false,
            }
        ]
    },
    {
        id: 5,
        question: 'The influencers should purchase or already own the product',
        completed: false,
    }
];
export const ctData: Question[] = [
    {
        id: 1,
        question: 'No, I have my own content.',
        completed: false,
    },
    {
        id: 2,
        question: 'Yes, I want the influencer to create the content for me.',
        completed: false,
    },
];
export const issueData: Question[] = [
    {
        id: 1,
        question: 'Person requests payment outside of Infinovae.',
        completed: false,
    },
    {
        id: 2,
        question: 'Person pretends to be someone else.',
        completed: false,
    },
    {
        id: 3,
        question: 'Person does not follow obligations.',
        completed: false,
    },
    {
        id: 4,
        question: 'Profile seems fake or contains plagiarized or stolen content.',
        completed: false,
    },
    {
        id: 5,
        question: 'Profile contains inappropriate or malicious information.',
        completed: false,
    },
    {
        id: 6,
        question: 'Profile contains contact information.',
        completed: false,
    },
    {
        id: 7,
        question: 'Something else',
        completed: false,
    }
];
