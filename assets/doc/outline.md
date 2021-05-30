## Project Manager

```javascript

class DOMHelper

  static moveElement(elementId, newDestinationSelector)


class ProjectInstall

  // Incorporates a project into the DOM.
  static init(project)

  static renderProject()
    ...
    projectElement.innerHTML =
    ...

  static connectSwitchButton()


class App

  static init() {
    const projectDb = [
      ...
    for (const project of projectDb) {
      ProjectInstall.init(project);
    }

  static switchHandler(id, buttonId)


App.init();

```
