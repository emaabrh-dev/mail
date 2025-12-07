// models/SelectTypeValue.ts

export class SelectTypeValue<CategoryType = number> {
  constructor(
    public resourceKey: string,
    public abbreviation: string,
    public categories: CategoryType
  ) {}

  // Only allow this method if categories are numeric bitmask
  hasCategory(category: CategoryType & number): boolean {
    return typeof this.categories === "number"
      ? ((this.categories as unknown as number) & category) !== 0
      : false;
  }
}