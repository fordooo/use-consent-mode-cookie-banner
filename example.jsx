import React from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { useCookieBanner } from "./use-cookie-banner";

const Example = () => {
  // call useCookieBanner hook in your app where it will show up on all desired pages
  useCookieBanner({ lang: "en", privacyPolicyUrl: "/privacy-policy" });

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={CookieConsent.showPreferences}>
        Cookie Preferences
      </button>
    </div>
  );
};

export default Example;
