"use client";
import { useEffect } from "react";

export default function IonIconsLoader() {
  useEffect(() => {
    const scriptModule = document.createElement("script");
    scriptModule.type = "module";
    scriptModule.src =
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";

    const scriptNoModule = document.createElement("script");
    scriptNoModule.noModule = true;
    scriptNoModule.src =
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";

    document.body.appendChild(scriptModule);
    document.body.appendChild(scriptNoModule);

    return () => {
      document.body.removeChild(scriptModule);
      document.body.removeChild(scriptNoModule);
    };
  }, []);

  return null;
}
