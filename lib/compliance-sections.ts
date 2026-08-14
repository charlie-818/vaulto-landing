/**
 * Maps a compliance doc's numeric order to its sidebar section header.
 * Returns null for orders that don't belong to a labelled section.
 */
export function sectionLabel(order: number): string | null {
  if (order === 0) return "Start here";
  if (order >= 1 && order <= 6) return "The five buckets";
  if (order >= 10 && order <= 11) return "Foundations & case law";
  if (order >= 12 && order <= 13) return "Compliance paths";
  if (order >= 14 && order <= 16) return "Legislation & jurisdictions";
  if (order === 17) return "Staff guidance";
  if (order === 20) return "Glossary";
  if (order >= 99) return "Sources";
  return null;
}
