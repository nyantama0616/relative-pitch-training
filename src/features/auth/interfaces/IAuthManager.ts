import User from "./User";

export default interface IAuthManager {
    currentUser: User | null;
    
    isAuthorized(): boolean;
    signUp(email: string, password: string): Promise<boolean>;
    signIn(email: string, password: string): Promise<boolean>;
    signOut(): Promise<boolean>;
}
