import React from "react";

export default function ErrorMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return "ce champ est obligatoire";
      case "minLength":
        return "c'est trop court";
      case "pattern":
        return "entrer un mail valide";
      case "min":
        return <p>Minmium age is 18</p>;
      case "validate":
        return <p>email exist deja</p>;
      default:
        return null;
    }
  }

  return null;
}