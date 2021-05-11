export interface Question {
    id: number;
    question: string;
    completed: boolean;
    sub_quetions?: Question[];
}
