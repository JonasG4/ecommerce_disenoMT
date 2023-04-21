import React from "react";

export default function formatPhoneNumber(number) {
  let phoneNumberString = number;
  let newText = "";
  let cleaned = ("" + phoneNumberString).replace(/\D/g, "");

  for (let i = 0; i < cleaned.length; i++) {
    if (i == 4) {
      newText = newText + "-";
    }

    if (i < 8) {
      newText = newText + cleaned[i];
    }
  }
  return newText;
}
