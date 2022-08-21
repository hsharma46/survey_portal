export class AppConstant {
    public static LOCAL_URL = 'https://localhost:44357/api/';
    public static DEV_URL = 'https://bishwa-survey-api.herokuapp.com/api/';
    public static API_URL = AppConstant.DEV_URL;
}

export function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000)
}