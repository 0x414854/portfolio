import fs from "fs-extra";
import path from "path";
import chokidar from "chokidar";
import OpenAI from "openai";

// === CONFIGURATION ===
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sourceFile = path.resolve("./locales/fr.json");
const targetLangs = ["en", "it", "de"]; // langues cibles
const batchSize = 10; // nombre de clés traduites par batch pour limiter les appels API

// === UTILITAIRES ===
async function translateBatch(texts, targetLang) {
  // Concatène les textes pour un batch
  const prompt = `
Tu es un traducteur précis. Traduis chaque élément du tableau en ${targetLang} en gardant exactement le sens. 
Réponds uniquement avec un JSON qui contient le même nombre d'éléments traduits, dans le même ordre.
Voici le texte à traduire : 
${JSON.stringify(texts)}
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  try {
    return JSON.parse(response.choices[0].message.content.trim());
  } catch (err) {
    console.error("Erreur parsing JSON de la traduction", err);
    return texts; // fallback
  }
}

// Parcourt un JSON et extrait toutes les clés avec leurs chemins
function flattenJson(json, prefix = "") {
  const result = [];
  for (const key in json) {
    const pathKey = prefix ? `${prefix}.${key}` : key;
    if (typeof json[key] === "string") {
      result.push({ path: pathKey, value: json[key] });
    } else if (typeof json[key] === "object") {
      result.push(...flattenJson(json[key], pathKey));
    }
  }
  return result;
}

// Reconstruit le JSON à partir des chemins
function unflattenJson(flatArr) {
  const result = {};
  flatArr.forEach(({ path, value }) => {
    const keys = path.split(".");
    let obj = result;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        obj[k] = value;
      } else {
        obj[k] = obj[k] || {};
        obj = obj[k];
      }
    });
  });
  return result;
}

// === FONCTION PRINCIPALE ===
async function translateFile() {
  console.log("📚 Lecture du fichier source...");
  const frJson = await fs.readJson(sourceFile);
  const flatFr = flattenJson(frJson);

  for (const lang of targetLangs) {
    console.log(`🌐 Traduction vers ${lang}...`);
    let targetJson = {};
    const targetFile = path.resolve(`./locales/${lang}.json`);
    if (fs.existsSync(targetFile)) {
      targetJson = await fs.readJson(targetFile);
    }

    const flatTarget = flattenJson(targetJson);
    const translatedMap = Object.fromEntries(
      flatTarget.map((f) => [f.path, f.value]),
    );

    // Sélectionne les clés à traduire (nouvelles ou modifiées)
    const toTranslate = flatFr.filter((f) => translatedMap[f.path] !== f.value);

    if (toTranslate.length === 0) {
      console.log(`✅ ${lang} déjà à jour`);
      continue;
    }

    // Batch translation
    const translatedFlat = [];
    for (let i = 0; i < toTranslate.length; i += batchSize) {
      const batch = toTranslate.slice(i, i + batchSize);
      const texts = batch.map((b) => b.value);
      const translatedTexts = await translateBatch(texts, lang);

      batch.forEach((b, idx) => {
        translatedFlat.push({ path: b.path, value: translatedTexts[idx] });
      });
    }

    // Merge avec les anciennes traductions
    const finalFlat = flatTarget
      .filter((f) => !translatedFlat.some((tf) => tf.path === f.path))
      .concat(translatedFlat);

    const finalJson = unflattenJson(finalFlat);
    await fs.writeJson(targetFile, finalJson, { spaces: 2 });
    console.log(`✅ ${lang}.json mis à jour`);
  }
}

// === WATCHER ===
chokidar.watch(sourceFile).on("change", () => {
  console.log("✏️ Changement détecté dans fr.json, traduction en cours...");
  translateFile().catch(console.error);
});

// === EXECUTION INITIALE ===
translateFile().catch(console.error);
