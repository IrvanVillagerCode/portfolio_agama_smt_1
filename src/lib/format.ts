export function formatTanggal(tanggal: string) {
  if (!tanggal) return "";
  try {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return tanggal;
  }
}

