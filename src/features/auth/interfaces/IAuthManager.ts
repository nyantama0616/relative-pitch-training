import IUser from "./IUser";

export default interface IAuthManager {
    currentUser: IUser | null;
    
    isAuthorized(): boolean;
    signUp(email: string, password: string): Promise<boolean>;
    signIn(email: string, password: string): Promise<boolean>;
    signOut(): Promise<boolean>;
}
