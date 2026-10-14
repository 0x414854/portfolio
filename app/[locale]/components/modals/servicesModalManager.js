"use client";

import { useEffect, useState } from "react";

import ModalEssentiel from "./modalEssentiel";
// import ModalCroissance from "./ModalCroissance";
// import ModalBusiness from "./ModalBusiness";
// import ModalMaintenance from "./ModalMaintenance";
// import ModalAutomatisation from "./ModalAutomatisation";

export default function ServicesModalManager() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    function handleOpen(event) {
      setActiveModal(event.detail);
    }

    document.addEventListener("open-service-modal", handleOpen);

    return () => {
      document.removeEventListener("open-service-modal", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    function handleEscape(event) {
      if (event.key === "Escape") setActiveModal(null);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeModal]);

  const modalProps = {
    onClose: () => setActiveModal(null),
  };

  switch (activeModal) {
    case "essentiel":
      return <ModalEssentiel {...modalProps} />;

    case "croissance":
      return <ModalCroissance {...modalProps} />;

    case "business":
      return <ModalBusiness {...modalProps} />;

    case "maintenance":
      return <ModalMaintenance {...modalProps} />;

    case "automatisation":
      return <ModalAutomatisation {...modalProps} />;

    default:
      return null;
  }
}
