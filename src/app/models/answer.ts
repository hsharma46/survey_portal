export class Answer {
    _id?: string = '';
    answerTitle: string = '';
    answerGroup: Option[] = [];
    timestamp: any;
}

export class Option {
    _id: number;
    optionText: string;
    optionValue: string;
}