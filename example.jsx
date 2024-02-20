import React from "react";
import { useCookieBanner } from "./use-cookie-banner";

const Example = () => {
  // call useCookieBanner hook in your app where it will show up on all desired pages
  useCookieBanner({ lang: "en", privacyPolicyUr: "/privacy-policy" });

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default Example;
