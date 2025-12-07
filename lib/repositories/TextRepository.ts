// lib/repositories/TextRepository.ts
import { SelectTypeValue } from "../models/SelectTypeValue";
import { TextCategory } from "../models/TextCategory";

export namespace TextRepository {
  const _textTypes: Record<string, SelectTypeValue<TextCategory>> = {};

  const addAll = (
    dict: Record<string, SelectTypeValue<TextCategory>>
  ) => Object.assign(_textTypes, dict);

  // ---- JURIDIQUE --------------------------------------------------
  addAll({
    "1000": new SelectTypeValue("text_constitution", "CONST", TextCategory.Juridique),
    "1100": new SelectTypeValue("text_loi_constitutionnelle", "LCO", TextCategory.Juridique),
    "1110": new SelectTypeValue("text_loi_organique", "LOA", TextCategory.Juridique),
    "1120": new SelectTypeValue("text_loi", "LOI", TextCategory.Juridique),
    "1130": new SelectTypeValue("text_ordonnance", "ORD", TextCategory.Juridique),
    "1200": new SelectTypeValue("text_decret", "DEC", TextCategory.Juridique),
    "1300": new SelectTypeValue("text_arrete", "ARR", TextCategory.Juridique),
    "1310": new SelectTypeValue("text_arrete_interministeriel", "ARI", TextCategory.Juridique),
    "1400": new SelectTypeValue("text_circulaire", "CIR", TextCategory.Juridique),
    "1500": new SelectTypeValue("text_decision", "DCS", TextCategory.Juridique),
    "1600": new SelectTypeValue("text_instruction", "INS", TextCategory.Juridique),
    "1610": new SelectTypeValue("text_instruction_particuliere", "IP", TextCategory.Juridique),
    "1700": new SelectTypeValue("text_deliberation", "DELIB", TextCategory.Juridique),
    "1710": new SelectTypeValue("text_arret", "ARRT", TextCategory.Juridique),
    "1720": new SelectTypeValue("text_avis", "AVIS", TextCategory.Juridique),
    "1730": new SelectTypeValue("text_jugement", "JUG", TextCategory.Juridique),
    "1740": new SelectTypeValue("text_declaration", "DECL", TextCategory.Juridique),
    "1800": new SelectTypeValue("text_expose_motifs_loi", "EML", TextCategory.Juridique),
    "1801": new SelectTypeValue("text_expose_motifs_ordonnance", "EMO", TextCategory.Juridique)
  });

  // ---- ÉTAT CIVIL -------------------------------------------------
  addAll({
    "1900": new SelectTypeValue("text_acte_de_naissance", "ACN", TextCategory.Juridique),
    "1901": new SelectTypeValue("text_acte_de_reconnaissance", "ACREC", TextCategory.Juridique),
    "1902": new SelectTypeValue("text_acte_adoption_simple", "ACAS", TextCategory.Juridique),
    "1903": new SelectTypeValue("text_acte_adoption_pleniere", "ACAP", TextCategory.Juridique),
    "1904": new SelectTypeValue("text_acte_de_rejet", "ACRJ", TextCategory.Juridique),
    "1910": new SelectTypeValue("text_acte_de_mariage", "ACM", TextCategory.Juridique),
    "1911": new SelectTypeValue("text_acte_de_divorce", "ACDIV", TextCategory.Juridique),
    "1920": new SelectTypeValue("text_acte_de_deces", "ACD", TextCategory.Juridique),
    "1930": new SelectTypeValue("text_acte_de_notoriete", "ACNOT", TextCategory.Juridique),
  });

  // ---- CORRESPONDANCE MILITAIRE ----------------------------------
  addAll({
    "2000": new SelectTypeValue("text_ordre", "ORDRE", TextCategory.CorrespondanceMilitaire),
    "2010": new SelectTypeValue("text_ordre_du_corps", "ODC", TextCategory.CorrespondanceMilitaire),
    "2020": new SelectTypeValue("text_ordre_d_appel", "ODA", TextCategory.CorrespondanceMilitaire),
    "2200": new SelectTypeValue("text_telegramme_officiel", "TO", TextCategory.CorrespondanceMilitaire),
    "2300": new SelectTypeValue("text_note_d_organisation", "NDO", TextCategory.CorrespondanceMilitaire),
    "2310": new SelectTypeValue("text_note_de_service", "NDS", TextCategory.CorrespondanceMilitaire),
    "2400": new SelectTypeValue("text_rapport", "RAPPORT", TextCategory.CorrespondanceMilitaire),
    "2410": new SelectTypeValue("text_compte_rendu", "CR", TextCategory.CorrespondanceMilitaire),
    "2420": new SelectTypeValue("text_compte_rendu_d_une_punition", "CRP", TextCategory.CorrespondanceMilitaire),
    "2500": new SelectTypeValue("text_transmis", "TRANSMIS", TextCategory.CorrespondanceMilitaire),
    "2501": new SelectTypeValue("text_copie_conforme_transmise", "CCT", TextCategory.CorrespondanceMilitaire),
    "2510": new SelectTypeValue("text_bordereau_envoi", "BE", TextCategory.CorrespondanceMilitaire),
    "2511": new SelectTypeValue("text_bordereau_envoi_collectif", "BEC", TextCategory.CorrespondanceMilitaire),
    "2600": new SelectTypeValue("text_proces_verbal", "PV",
      TextCategory.CorrespondanceMilitaire | TextCategory.Administratif),
    "2700": new SelectTypeValue("text_lettre", "LETTRE",
      TextCategory.CorrespondanceMilitaire | TextCategory.Administratif),
    "2710": new SelectTypeValue("text_fiche", "FICHE", TextCategory.CorrespondanceMilitaire),
    "2800": new SelectTypeValue("text_recepisse", "RECEPISSE",
      TextCategory.CorrespondanceMilitaire | TextCategory.Administratif),
    "2900": new SelectTypeValue("text_bulletin_correspondance", "BULLETIN",
      TextCategory.CorrespondanceMilitaire | TextCategory.Administratif),
  });

  // ---- AUTRES CATÉGORIES -----------------------------------------
  addAll({
    "3000": new SelectTypeValue("text_reglementation_aeronautique_de_madagascar", "RAM", TextCategory.Aeronautique),
    "3100": new SelectTypeValue("text_reglementation_aeronautique_militaire", "RAMIL", TextCategory.Aeronautique),
  });

  addAll({
    "4000": new SelectTypeValue("text_manuel_technique", "MT", TextCategory.Technique),
    "4100": new SelectTypeValue("text_guide_technique", "GT", TextCategory.Technique),
    "4200": new SelectTypeValue("text_specification_technique", "ST", TextCategory.Technique),
    "4300": new SelectTypeValue("text_procedure_technique", "PT", TextCategory.Technique),
  });

  addAll({
    "5000": new SelectTypeValue("text_directive", "DIR", TextCategory.Administratif),
    "5100": new SelectTypeValue("text_note", "NOTE", TextCategory.Administratif),
    "5200": new SelectTypeValue("text_memorandum", "MEMO", TextCategory.Administratif),
    "5300": new SelectTypeValue("text_protocole", "PROT", TextCategory.Administratif),
    "5400": new SelectTypeValue("text_formulaire", "FORM", TextCategory.Administratif),
    "5500": new SelectTypeValue("text_palmares", "PAL", TextCategory.Administratif),
    "5600": new SelectTypeValue("text_autorisation", "AUT", TextCategory.Administratif),
    "5610": new SelectTypeValue("text_convocation", "CONV", TextCategory.Administratif),
    "5620": new SelectTypeValue("text_attestation", "ATT",
      TextCategory.Administratif | TextCategory.Education),
    "5630": new SelectTypeValue("text_certificat", "CERT",
      TextCategory.Administratif | TextCategory.Education),
    "5700": new SelectTypeValue("text_contrat", "CONTRAT", TextCategory.Administratif),
  });

  addAll({
    "6000": new SelectTypeValue("text_brevet", "BREV", TextCategory.Education),
    "6100": new SelectTypeValue("text_license", "LIC", TextCategory.Education)
  });

  // ------------------------ PUBLIC API -------------------------------

  export const isValidId = (id: string): boolean =>
    Boolean(id) && id in _textTypes;

  export const getById = (id: string): SelectTypeValue<TextCategory> | undefined =>
    _textTypes[id];

  export const getAll = (): [string, SelectTypeValue<TextCategory>][] =>
    Object.entries(_textTypes);

  export const getByCategory = (...categories: TextCategory[]) => {
    return Object.entries(_textTypes)
      .filter(([_, v]) => categories.some(c => v.hasCategory(c)));
  };

  export const findByAbbreviation = (abbr: string) =>
    Object.values(_textTypes).find(t => t.abbreviation.toLowerCase() === abbr.toLowerCase());
}