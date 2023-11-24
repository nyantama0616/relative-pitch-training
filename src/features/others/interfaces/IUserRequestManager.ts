import IUser from "../../auth/interfaces/IUser";

export default interface IUserRequestManager {
    fetchAllUsers(): Promise<FetchAllUsersResponse | null>;
}

export type FetchAllUsersResponse = IUser[];
