/* @layer stories @kind data */
import type { TesseraStringsOverride } from '../../../src/primitives';

const APP_STRINGS: TesseraStringsOverride = {
  common: {
    loading: 'Chargement',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    copied: 'Copié',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher...',
    noMatches: 'Aucun résultat',
  },
  fields: {
    copyCode: 'Copier le code',
    selectPlaceholder: 'Choisir...',
    noOptions: 'Aucune option',
    dropFiles: 'Déposez les fichiers ici',
    browseFiles: 'ou cliquez pour parcourir',
    tagPlaceholder: 'Ajouter une étiquette...',
    learnMore: 'En savoir plus',
  },
  panels: {
    copyDebugInfo: 'Copier les infos de débogage',
    sectionFailed: 'Cette section ne peut pas être affichée',
  },
};

export { APP_STRINGS };
