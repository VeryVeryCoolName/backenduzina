import { adaugaInscriere } from "../repository/inscriereRepository.js";

const zileValide = [
    "4 martie (CSIE, REI, FABBV)",
    "5 martie (Management, Marketing, FABIZ, BTS)",
    "6 martie (Drept, ETA, EAM, AMP)"
];

const facultatiValide = [
    "CSIE", "Drept", "CIG", "FABIZ",
    "REI", "FABBV", "Management",
    "Marketing", "BTS", "AMP",
    "ETA", "EAM"
];

function eroareValidare(mesaj) {
    const eroare = new Error(mesaj);
    eroare.satus = 400;
    return eroare;
}

export async function salveazaInscriere(date) {
  if (!date || typeof date !== "object" || Array.isArray(date)) {
    throw eroareValidare("Date invalide.");
  }

  const { nume, prenume, email, zile, facultate, an, sursa } = date;

  if (
    typeof nume !== "string" ||
    typeof prenume !== "string" ||
    !nume.trim() ||
    !prenume.trim() ||
    nume.length > 100 ||
    prenume.length > 100
  ) {
    throw eroareValidare("Nume sau prenume invalid.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !emailRegex.test(email.trim())
  ) {
    throw eroareValidare("Email invalid.");
  }

  if (
    !Array.isArray(zile) ||
    zile.length === 0 ||
    zile.length > zileValide.length ||
    !zile.every(z => zileValide.includes(z)) ||
    new Set(zile).size !== zile.length
  ) {
    throw eroareValidare("Zile de participare invalide.");
  }

  if (
    !Array.isArray(facultate) ||
    facultate.length === 0 ||
    facultate.length > facultatiValide.length + 1 ||
    !facultate.every(f =>
      typeof f === "string" &&
      (
        facultatiValide.includes(f) ||
        (
          f.startsWith("Altă: ") &&
          f.slice(6).trim().length > 0 &&
          f.length <= 106
        )
      )
    ) ||
    new Set(facultate).size !== facultate.length ||
    facultate.filter(f => f.startsWith("Altă: ")).length > 1
  ) {
    throw eroareValidare("Facultate invalida.");
  }

  if (!["1", "2", "3"].includes(String(an))) {
    throw eroareValidare("An de studiu invalid.");
  }

  if (
    sursa != null &&
    (typeof sursa !== "string" || sursa.length > 500)
  ) {
    throw eroareValidare("Sursa invalida.");
  }
  const inscriere = {
    nume: nume.trim(),
    prenume: prenume.trim(),
    email: email.trim().toLowerCase(),
    zile,
    facultate,
    an: Number(an),
    sursa: (sursa || "").trim()
  };
  return await adaugaInscriere(inscriere);
}