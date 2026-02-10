const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

export function formatPrice(priceInPence: number): string {
  return formatter.format(priceInPence / 100);
}
