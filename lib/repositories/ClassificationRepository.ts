import { SelectTypeValue } from "../models/SelectTypeValue";

export namespace ClassificationRepository {
  const _classifications: Record<string, SelectTypeValue> = {
    "4": new SelectTypeValue("tres_secret", "TS", 0),
    "3": new SelectTypeValue("secret", "SE", 0),
    "2": new SelectTypeValue("secret_confidentiel", "SC", 0),
    "1": new SelectTypeValue("diffusion_restreinte", "DR", 0),
    "0": new SelectTypeValue("non_classe", "NC", 0),
  };

  export const getAll = (): [string, SelectTypeValue][] =>
    Object.entries(_classifications);

  export const isValidId = (id: string): boolean =>
    id in _classifications;

  export const getById = (id: string): SelectTypeValue | undefined =>
    _classifications[id];
}