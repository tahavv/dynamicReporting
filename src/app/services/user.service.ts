import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;

  public updateUser(user: any, idGRp: any): Observable<Object> {
    return this.http.post(`${this.apiUrl}/user/edit/${idGRp}`, user);
  }

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/email/${email}`);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/username/${username}`);
  }

  public getUserByEmail2(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/email2/${email}`);
  }
  public getUserByUsername2(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/username2/${username}`);
  }

  public deleteUser(id: any) {
    return this.http.delete(`${this.apiUrl}/user/delete/` + id);
  }

  public addUser(user: any, idGrp: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/add/${idGrp}`, user, {
      responseType: 'text',
    });
  }

  public assignRapport(id: any, rapports: any): Observable<Object> {
    return this.http.post(`${this.apiUrl}/user/assign/` + id, rapports);
  }

  public detacheRapport(id: any, rapports: any): Observable<Object> {
    return this.http.post(`${this.apiUrl}/user/detach/` + id, rapports);
  }

  public addToDashboard(userId: any, rapId: any): Observable<Object> {
    return this.http.put(
      `${this.apiUrl}/user/assignbyid/${userId}/${rapId}`,
      null
    );
  }

  public removeFromDashboard(userId: any, rapId: any): Observable<Object> {
    return this.http.put(
      `${this.apiUrl}/user/removerapport/${userId}/${rapId}`,
      null
    );
  }

  getReportsByUserId(userId: any) {
    const url = `${this.apiUrl}/user/${userId}/reports`;
    return this.http.get(url);
  }

  updateReportOrderForUser(userId: any, repId: any, newOrder: any) {
    const url = `${this.apiUrl}/user/${userId}/reports/${repId}/order`;
    const body = { newOrder: newOrder };
    return this.http.put(url + '?newOrder=' + newOrder, null);
  }
  updatePassword(username: any, oldPassword: any, newPassword: any) {
    const url = `${this.apiUrl}/user/${username}/password`;
    const params = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    console.log('URL:', url); // Add this line to check the URL
    console.log('Params:', params); // Add this line to check the parameters

    return this.http.put<any>(url, null, { params: params });
  }

  updateProfile(id: any, request: any) {
    return this.http.put(`${this.apiUrl}/user/update/${id}/`, request);
  }

  resetPassword(info: any) {
    return this.http.post(`${this.apiUrl}/reset-password`, info);
  }

  updatePas(info: any) {
    return this.http.put(`${this.apiUrl}/update-password`, info, {
      responseType: 'text' as 'json',
    });
  }

  loadCaptcha() {
    return this.http.get(`${this.apiUrl}/captcha`).pipe(
      map((response) => {
        // Assuming response is of any type; you might want to define a more specific type
        const captchaData: any = response;
        const captchaImageSrc =
          'data:image/png;base64,' + captchaData.captchaImage;
        return {
          captchaKey: captchaData.captchaKey,
          captchaImageSrc: captchaImageSrc,
        };
      })
    );
  }

  validateCaptcha(captchaKey: string, captchaInput: string) {
    const payload = {
      key: captchaKey,
      value: captchaInput,
    };
    return this.http.post(`${this.apiUrl}/validate-captcha`, payload);
  }
}
