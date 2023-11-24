import { TypeRequestManager } from "./RequestManager";
import IUserRequestManager, { FetchAllUsersResponse } from "../interfaces/IUserRequestManager";
import requests from "../../../requests";

export default class UserRequestManager implements IUserRequestManager {
    private RequestManager: TypeRequestManager;

    constructor(RequestManager: TypeRequestManager) {
        this.RequestManager = RequestManager;

        this.fetchAllUsers = this.fetchAllUsers.bind(this);
    }

    public async fetchAllUsers(): Promise<FetchAllUsersResponse | null> {
        const requestManager = new this.RequestManager<null, FetchAllUsersResponse>();
        
        return new Promise((resolve, reject) => {
            requestManager
            .get(requests.user.all)
                .then((response) => {
                    resolve(response!);
                })
                .catch((error) => {
                    reject(null);
                });
        });
    }
}
