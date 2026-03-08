export function generateUuids(count: number = 1): string[] {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    // Fallback if crypto.randomUUID isn't available in some old browser
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      uuids.push(crypto.randomUUID());
    } else {
      uuids.push(
        "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16),
        ),
      );
    }
  }
  return uuids;
}
