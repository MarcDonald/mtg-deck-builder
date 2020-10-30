import Variant from './variant';

export default interface Card {
  id: string;
  name: string;
  variants: Variant[];
}
