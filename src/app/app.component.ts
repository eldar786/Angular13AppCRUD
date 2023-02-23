import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  }

constructor(private cardsService: CardsService){
}

  ngOnInit(): void {
    this.getAllCards();
  }

  //.subsribe makes sure that we call observable, instead it will not to anything
  getAllCards(){
    this.cardsService.getAllCards()
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  onSubmit() {
// console.log(this.card)
    if(this.card.id === ''){
      this.cardsService.addCard(this.card)
    .subscribe(
      response => {
        // console.log(response);
        this.getAllCards();
        this.card = {
          id: '',
          cardNumber: '',
          cardholderName: '',
          expiryMonth: '',
          expiryYear: '',
          cvc: ''
        };
      }
    );
    } else{
      //if id exists
      this.updateCard(this.card);
    }

    
    
  }

  deleteCard(id: string){
    this.cardsService.deleteCard(id)
    .subscribe(
      response => {
        this.getAllCards();
      }
    );
  }

// Create method which takes the card details which is of type Card
  populateForm(card: Card){
    this.card = card;
  }

  updateCard(card: Card){
    this.cardsService.updateCard(card)
    .subscribe(
      response => {
        this.getAllCards();
      }
    );
  }
}


