# React Consent Mode Cookie Banner

Set up Google Consent Mode in your React project with Cookie Consent and Google Tag Manager. No paid services, 100% free!

![cookie banner](./images/cookie-banner.png)

## Install and Setup Cookie Consent Banner

- Install the [cookieconsent](https://github.com/osano/cookieconsent) library: `yarn add vanilla-cookieconsent`
- Copy the `CookieBanner` component to your project and customize text/options (reference [docs](https://cookieconsent.orestbida.com/reference/api-reference.html) for available options)
- Add to any pages needing the banner: eg `<CookieBanner language="en" privacyPolicyUrl="/privacy-policy" />`
- Preferences modal can be reopened by calling `CookieConsent.showPreferences()`, eg from a "Cookie Preferences" button in the footer
- The `CookieBanner` component takes two props:
  - `language` sets the language of the banner
  - `privacyPolicyUrl` sets the URL of the privacy policy page link

## Setup Google Tag Manager to Handle Consent Selection

- Enable consent mode in GTM container: Admin -> Container Settings -> Enable consent overview

- Add all of the Variables, Tags, and Triggers below, then go to Tags -> Consent Overview (shield icon) and setup any additional consent checks needed for tags. Eg add `Additional Consent: ad_storage` to any Facebook Pixel tags.

- If using the Google Ads Conversion Linker tag, you may need to enable the "Enable linking on all page URLs" option. More info in [this article](https://www.analyticsmania.com/post/conversion-linker-google-tag-manager/#optional).

![gtm changes](./images/gtm-changes.png)

### Variables

1. 1st Party Cookie: `cookie - cookieconsent`

- Cookie Name: `cc_cookie`
- URI-decode cookie: `enabled`

2. GTM Consent State variable template: `Consent State`

- First enable the GTM Consent State template from the Community Template Gallery: Variables -> User-Defined Variables -> New -> Community Template Gallery -> GTM Consent State by Ayudante
- Then create a new variable named `Consent State` and select the GTM Consent State variable type from Custom Templates

3. Custom JavaScript Variable: `cjs - consent - analytics`

```
function() {
  var cookie = {{cookie - cookieconsent}}
  if (!cookie) {
    return 'denied'
  }
  var json = JSON.parse(cookie)
  if (json["categories"].indexOf('analytics') !== -1) {
    return 'granted'
  } else {
    return 'denied'
  }
}
```

4. Custom JavaScript Variable: `cjs - consent - functionality`

```
function() {
  var cookie = {{cookie - cookieconsent}}
  if (!cookie) {
    return 'denied'
  }
  var json = JSON.parse(cookie)
  if (json["categories"].indexOf('functionality') !== -1) {
    return 'granted'
  } else {
    return 'denied'
  }
}
```

5. Custom JavaScript Variable: `cjs - consent - marketing`

```
function() {
  var cookie = {{cookie - cookieconsent}}
  if (!cookie) {
    return 'denied'
  }
  var json = JSON.parse(cookie)
  if (json["categories"].indexOf('marketing') !== -1) {
    return 'granted'
  } else {
    return 'denied'
  }
}
```

### Tags

We need to setup two instances of this tag from the community template gallery:

Tags -> Community Template Gallery -> Consent Mode (Google tags) by gtm-templates-simo-ahava

1. `Consent Mode - Default Settings` - This sets the default consent settings on consent initialization

- Consent Command: `Default`
- Wait for Undate: `2000`
- Required for Google services / Other signals: update to use variables `{{cjs - consent - marketing|analytics|functionality}}`
- Firing Triggers: `Consent Initialization: All Pages`

2. `Consent Mode - Update Settings` - This updates the consent settings when a user submits their preferences

- Consent Command: `Update`
- Required for Google services / Other signals: update to use variables `{{cjs - consent - marketing|analytics|functionality}}`
- Firing Triggers: `custom event - consent updated`

### Triggers

1. Custom Event: `custom event - consent initial selection`

- Event name: `consent_initial_selection`
- Should trigger all Google/FB/Linkedin/etc tags that usually trigger on All Page View trigger

2. Custom Event: `custom event - consent updated`

- Event name: `consent_update`
- Should trigger `Consent Mode - Update Settings` tag

## Testing

In Google Tag Manager, preview your workspace changes and you should see variable and cookie changes before/after giving consent via the new cookie banner.

Example of GTM variables before and after clicking "Accept All" on the banner:

![gtm variables](./images/before-after.png)

## Useful Links

### CookieConsent package

- CookieConsent Github https://github.com/osano/cookieconsent
- CookieConsent Docs https://cookieconsent.orestbida.com/essential/getting-started.html
- CookieConsent v3 Playground https://playground.cookieconsent.orestbida.com/
- CookieConsent Next.js 13 example: https://stackblitz.com/edit/stackblitz-starters-gobdmp

### GTM consent mode installation

- How to install a Consent Mode Cookie Banner with GTM (Part 1) https://youtu.be/In4TNHLTz_Y
- How to Install Consent Mode V2 (with GTM and Cookiebot) https://youtu.be/KVXnCdImOSk
- Basic vs Advanced Consent Mode https://support.google.com/google-ads/answer/10000067

### GDRP compliance info

- Cookie Consent Banner Checklist: https://cookie-script.com/blog/cookie-consent-banner-checklist
- GDRP Cookie Compliance Checklist: https://cookieinformation.com/resources/blog/checklist-to-collecting-valid-cookie-consent-in-the-era-of-the-gdpr/
