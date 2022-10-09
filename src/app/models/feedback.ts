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
    "answer": string;
}

export class FeedbackComplete {
    _id: string = "";
    userDetails: RegistrationDetails;
    surveyDetails: FeedbackAnswer[];
    userId: string;
}