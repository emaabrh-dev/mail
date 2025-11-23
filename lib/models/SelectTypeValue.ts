// models/SelectTypeValue.ts
import { TextCategory } from "./TextCategory";

export class SelectTypeValue {
  constructor(
    public resourceKey: string,
    public abbreviation: string,
    public categories: TextCategory
  ) {}

  hasCategory(category: TextCategory): boolean {
    return (this.categories & category) !== 0;
  }
}