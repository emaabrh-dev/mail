import { SelectTypeValue } from "../models/SelectTypeValue";

export namespace StatutRepository {
  const _statuts: Record<string, SelectTypeValue> = {
    "1": new SelectTypeValue("en_vigueur", "VIG", 0),
    "0": new SelectTypeValue("abroge", "ABR", 0),
    // add more statuses here if needed
  };

  export const getAll = (): [string, SelectTypeValue][] =>
    Object.entries(_statuts);

  export const isValidId = (id: string): boolean =>
    id in _statuts;

  export const getById = (id: string): SelectTypeValue | undefined =>
    _statuts[id];
}