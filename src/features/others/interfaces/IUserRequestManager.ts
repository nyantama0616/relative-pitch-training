import User from "../../auth/interfaces/User";

export default interface IUserRequestManager {
    fetchAllUsers(): Promise<FetchAllUsersResponse | null>;
}

export type FetchAllUsersResponse = User[];
