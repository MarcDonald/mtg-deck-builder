import Ability from './ability';

export default interface Card {
  id: string;
  name: string;
  abilities: Ability[];
}
