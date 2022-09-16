export class Survey {
    _id?: string = '';
    questionTitle: string = '';
    questionGroup: Option[] = [];
    timestamp: any;
}

export interface QuestionType {
    value: string;
    viewValue: string;
}

export class Option {
    _id: number;
    optionText: string;
}