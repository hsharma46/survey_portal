export class AppConstant {
    public static LOCAL_URL = 'http://localhost:3000/api/';
    // public static DEV_URL = 'https://bishwa-survey-api.herokuapp.com/api/';
    public static DEV_URL = 'https://mysterious-cyan-jersey.cyclic.app/api/';
    public static API_URL = AppConstant.DEV_URL;
}

export function getTimestampInSeconds() {
    //return Math.floor(Date.now() / 1000)
    return new Date().getTime();
}