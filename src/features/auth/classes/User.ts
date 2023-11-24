import IUser from "../interfaces/IUser";
import requests from "../../../requests";

export default class User implements IUser {
    public user_name: string;
    public email: string;
    public image_url: string;
    
    constructor(user_name: string, email: string, image_path: string) {
        this.user_name = user_name;
        this.email = email;
        this.image_url = `${requests.image.fetch}/${image_path}`;
    }
}
