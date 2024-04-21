import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, firstValueFrom, from, lastValueFrom } from 'rxjs';
import { UserType } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  user$ = user(this.firebaseAuth);

  currentUserSig = signal<UserType | null | undefined>(undefined);

  async isAuthenticated(): Promise<boolean> {
    const user = await firstValueFrom(this.user$);
    return user !== null && user !== undefined;
  }

  register(
    email: string,
    password: string,
    username: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((res) => {
      return updateProfile(res.user, { displayName: username });
    });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }
}
