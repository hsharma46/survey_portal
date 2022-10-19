export class RegistrationDetails {
    firstName: string = "";
    lastName: string = "";
    address: string = "";
    city: string = "";
    state: string = "";
    userEmail: string = "";
}

export class FeedbackAnswer {
    "_id": string;
    "question": string;
    "options": [];
    "type": string;
    "answer": {
        "optionText": string;
        "optionValue": string;
    };
}

export class FeedbackComplete {
    _id: string = "";
    userDetails: RegistrationDetails;
    feedbackDetails: FeedbackAnswer[];
    userId: string;
}

export class FeedbackList {
    _id: string = '';
    user: string = '';
    agent: string = "";
    code: string = "";
}