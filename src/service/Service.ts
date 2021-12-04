
import { IpcMainFunction } from "../types/ipcTypes";
// import Git from 'nodegit';

export class GitService {

  public static setGlobalGitCredentials: IpcMainFunction<{userName: string, userEmail: string}> = (event, {userEmail, userName}) => {
    console.log(userEmail, userName)
  };
}