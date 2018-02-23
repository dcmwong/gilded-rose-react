import React, {Component} from 'react';
import './App.css';
import {range} from 'ramda';

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name !== 'Aged Brie' &&
        this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert'
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert'
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== 'Aged Brie') {
          if (
            this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert'
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

class App extends Component {
  constructor() {
    super();
    const items = [];
    items.push(new Item('+5 Dexterity Vest', 10, 20));
    items.push(new Item('Aged Brie', 2, 0));
    items.push(new Item('Elixir of the Mongoose', 5, 7));
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
    // this conjured item does not work properly yet
    items.push(new Item('Conjured Mana Cake', 3, 6));

    this.state = {
      days: 100,
      gildedRose: new Shop(items),
    };
  }
  render() {
    return (
      <div className="App">
        <p>OMGHAI!</p>
        {range(1, this.state.days).map(day => {
          return (
            <div key={`${day}`}>
              <p>-------- day {day} --------</p>
              <p>name, sellIn, quality</p>
              {this.state.gildedRose.items.map(item => { 
                  this.state.gildedRose.updateQuality();
                  
                  return (<p key={`${item.name}-${item.sellIn}${day}`}>
                  {item.name}, {item.sellIn}, {item.quality}
                  </p>)
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
