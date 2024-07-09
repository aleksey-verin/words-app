
export interface AuthData {
  isAuth: boolean;
  user: UserData | null;
}
export interface UserData {
  email: string | null;
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
}