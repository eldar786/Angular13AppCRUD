import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  baseUrl = 'https://localhost:44373/api/cards'

  constructor(private http: HttpClient) { }

 // Get all cards  (this will be array return)
 getAllCards(): Observable<Card[]> {
  return this.http.get<Card[]>(this.baseUrl);
 }
 //take the body as a parameter which is of type Card
 addCard(card: Card): Observable<Card>{
  card.id = '00000000-0000-0000-0000-000000000000';
  return this.http.post<Card>(this.baseUrl, card);
 }
//This will also return a Card (delete<Card>) element after successfull deleting 
deleteCard(id: string): Observable<Card>{
 return this.http.delete<Card>(this.baseUrl + '/' + id);
}

updateCard(card: Card): Observable<Card> {
  return this.http.put<Card>(this.baseUrl + '/' + card.id, card);
}

}
