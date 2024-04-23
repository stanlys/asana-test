import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { KEY_LOGIN } from '../models';
import { IUser, IUserLogin } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: LocalStorageService) {}

  private users: IUser[] = [];
  public user$ = new BehaviorSubject<IUser | undefined>(undefined);

  private getUsers() {
    this.users = (this.storage.getItem(KEY_LOGIN) as IUser[]) || [];
  }

  private findUserByLogin(login: string): IUser | undefined {
    return this.users?.find(
      (user) => user.login.toLocaleUpperCase() === login.toLocaleUpperCase()
    );
  }

  private registerUser(user: IUser): void {
    this.users.push(user);
    this.storage.setItem(KEY_LOGIN, this.users);
  }

  private checkUser(user: IUser | IUserLogin): IUser | undefined {
    this.getUsers();
    return this.findUserByLogin(user.login);
  }

  register(user: IUser): boolean {
    const isUser = this.checkUser(user);
    if (!isUser) {
      this.registerUser(user);
      this.user$.next(isUser);
      return true;
    }
    return false;
  }

  login(user: IUserLogin): boolean {
    const isUser = this.checkUser(user);
    this.user$.next(isUser);
    return Boolean(isUser);
  }

  exit() {
    this.user$.next(undefined);
  }
}
