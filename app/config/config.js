const contact = {
  brand: "Simplitech",

  location: {
    city: "Cairns",
    region: "Queensland",
    country: "Australie",
    timezone: process.env.CONTACT_TIMEZONE || "Australia/Brisbane",
  },

  schedule: {
    timezone: "Australia/Brisbane",
    startHour: 8,
    endHour: 20,
    workingDays: [1, 2, 3, 4, 5],
  },

  // Fuseau dans lequel les horaires seront affichés :
  displayTimezone: "Europe/Paris",

  email: process.env.CONTACT_EMAIL || "",
  phones: [
    {
      label: "France - Whatsapp uniquement",
      number: process.env.CONTACT_PHONE_FR || "",
      href: process.env.WHATSAPP_URL || "",
    },
    {
      label: "Australie",
      number: process.env.CONTACT_PHONE_AU || "",
      href: process.env.CONTACT_PHONE_AU || "",
    },
  ],

  socialLinks: [
    {
      label: "LinkedIn",
      href: process.env.LINKEDIN_URL || "",
    },
    {
      label: "Instagram",
      href: process.env.NSTAGRAM_URL || "",
    },
    {
      label: "GitHub",
      href: process.env.GITHUB_URL || "",
    },
  ],

  privacyUrl: "/politique-de-confidentialite",
};

export default contact;
