import DeckCard from './deck-card';
import Note from './note';

export default interface DeckFull {
  name: string;
  id: string;
  cards: DeckCard[];
  username: string;
  notes: Note[];
}
