import React from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { CookieBanner } from "./cookie-banner";

const LANGUAGE = "en";

const Example = () => {
  // Add CookieBanner to your app where it will be included on all desired pages

  return (
    <>
      <CookieBanner language={LANGUAGE} privacyPolicyUrl="/privacy-policy" />
      <main>
        <h1>Hello World</h1>
        <p>Click the button below to open the cookie preferences modal</p>
        <button onClick={CookieConsent.showPreferences}>
          Cookie Preferences
        </button>
      </main>
    </>
  );
};

export default Example;
