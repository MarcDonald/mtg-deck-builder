import DeckCard from './deck-card';

export default interface DeckFull {
  name: string;
  id: string;
  cards: DeckCard[];
  username: string;
}
