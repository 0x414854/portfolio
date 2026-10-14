const getDateTimeParts = (date, timeZone) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  return Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, Number(value)]),
  );
};

/**
 * Convertit une date/heure exprimée dans un fuseau IANA
 * en instant UTC.
 *
 * Exemple : 2026-10-12 à 08:00 en Europe/Paris.
 */
export function zonedDateTimeToUtc(
  { year, month, day, hour = 0, minute = 0, second = 0 },
  timeZone,
) {
  const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);

  let guess = targetAsUtc;

  // Ajuste l'instant jusqu'à ce que ses composantes locales
  // correspondent à la date/heure demandée.
  for (let i = 0; i < 4; i += 1) {
    const parts = getDateTimeParts(new Date(guess), timeZone);

    const representedAsUtc = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    );

    const correction = targetAsUtc - representedAsUtc;

    guess += correction;

    if (correction === 0) break;
  }

  return new Date(guess);
}

export function getZonedParts(date, timeZone) {
  return getDateTimeParts(date, timeZone);
}

export function isValidTimeZone(timeZone) {
  try {
    new Intl.DateTimeFormat("fr-FR", { timeZone });
    return true;
  } catch {
    return false;
  }
}
