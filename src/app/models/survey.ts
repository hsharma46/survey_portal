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

export class RegistrationDetails {
    firstName: string = "";
    lastName: string = "";
    address: string = "";
    city: string = "";
    state: string = "";
    userEmail: string = "";
}

export class SurveyAnswer {
    "_id": string;
    "question": string;
    "options": [];
    "type": string;
    "answer": string;
}

export class SurveyComplete {
    _id: string = "";
    userDetails: RegistrationDetails;
    surveyDetails: SurveyAnswer[];
    userId: string;
}

export class SurveyList {
    _id: string = '';
    user: string = '';
    agent: string = "";
}