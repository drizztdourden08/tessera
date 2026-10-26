/* @layer stories @kind data */
const slotHref = (id: string, targetKind?: string): string | undefined => (targetKind === 'slot' ? `/players/${id}` : undefined);

export { slotHref };
