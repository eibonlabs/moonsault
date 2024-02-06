# Changelog

## v.1.2.0

- updated how components are constructed and removed exports. customElements.define gets called when the module is loaded, so there is nothing to export.
- new window component can load components into a moveable window
  - the window component is in beta
  - the window component requires a parent element that is set to the size you want the window to maximize to. for example, if you want the window to maximize to full screen and minimize to the bottom of the screen, you will need a parent element that is set to those dimensions.
  - more concrete examples will be made available once the component is out of beta, but feel free to poke around and take a look at how it works!
- components by default have a "loaded" property that is used to prevent re-instantiating a component on DOM heirarchy change. this was added because of the way the window component brings windows to the top (by modifying the DOM). This movement in the DOM causes a web component to reinitialize, and to alleviate this, the default components now have a public loaded property that is checked before instantiation. Since this property is public, it can also be used in the app to see when a component has completed loading.
- updated README.md to include the above updates.

## v.1.1.1

- fixed sonarqube issues with moonsault create command line app

## v.1.1.0

- add event listener to hello world component
- add marked library for markdown parsing. this is a library used by the markdown component. more info is available here: https://github.com/markedjs/marked
- add content directory for markdown files
- fix issue with stylesheet naming when creating new components and pages
- remove CSS reset
- fix incorrect naming of components when creating them from the create app
- updates / spelling corrections for README.md
- updated moonsault create command line application to ask if the user would like the newly created app to be the default.

## v.1.0.0

- initial release
