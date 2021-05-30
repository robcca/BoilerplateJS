class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.prepend(element);
  }
}

class ProjectInstall {
  // Incorporates a project into the DOM.
  static init(project) {
    this.project = project;
    this.renderProject();
    this.connectSwitchButton();
    const blah = 1;
  }

  static renderProject() {
    // Create projectElement, the project's HTML
    const projectElement = this.createElement('li');
    const switchButtonCaption =
      this.project.type === 'active' ? 'Finish' : 'Activate';
    projectElement.innerHTML = `
      <li
        id="${this.project.projectId}"
        data-extra-info="${this.project.moreInfo}"
        class="card"
      >
        <h2>${this.project.title}</h2>
        <p>${this.project.info}</p>
        <button class="alt">More Info</button>
        <button>${switchButtonCaption}</button>
      </li>
    `;
    // Append projectElement to the appropriate list element.
    const renderHook = document.querySelector('active-projects').ul;
    renderHook.appendChild(projectElement);
  }

  static connectSwitchButton() {
    const buttonId =
      this.type === 'active' ? 'finish-button' : 'activate-button';
    const projectItemElement = document.getElementById(this.projectId);
    const switchButton = projectItemElement.querySelector(buttonId);
    switchButton.addEventListener('click', App.switchHandler);
  }
}

class App {
  static init() {
    const projectDb = [
      {
        id: 'p1',
        title: 'Finish the Course',
        info: 'Finish the course within the next two weeks.',
        moreInfo: 'Got lifetime access, but would be nice to finish it soon!',
        type: 'active',
      },
      {
        id: 'p2',
        title: 'Buy Groceries',
        info: "Don't forget to pick up groceries today.",
        moreInfo: 'Not really a business topic but still important.',
        type: 'active',
      },
      {
        id: 'p3',
        title: 'Book Hotel',
        info:
          "Academind conference takes place in December, don't forget to book a hotel.",
        moreInfo: 'Super important conference! Fictional but still!',
        type: 'finished',
      },
    ];
    for (const project of projectDb) {
      ProjectInstall.init(project);
    }
  }

  static switchHandler(id, buttonId) {
    // get the projectItem object, given the project Id:
    const projectItem = this.activeProjectList.projects.find(
      (p) => p.projectId === id
    );

    // If project is in active list then move it
    // finished list, and vice versa.
    if (buttonId === 'finish-button') {
      const destinationType = 'finished';
      // ADD to FINISHED:
      this.finishedProjectList.projects.splice(0, 0, projectItem); // Objects
      DOMHelper.moveElement(id, `#${destinationType}-projects ul`); //DOM

      // REMOVE from ACTIVE:
      this.activeProjectList.projects = this.activeProjectList.projects.filter(
        (p) => p.projectId !== id
      );
    } else {
      const destinationType = 'active';
      // ADD to ACTIVE:
      const project = document.getElementById(id);
      this.activeProjectList.projects.splice(0, 0, projectItem); // Objects
      DOMHelper.moveElement(id, `#${destinationType}-projects ul`); //DOM

      // REMOVE from FINISHED:
      this.finishedProjectList.projects = this.finishedProjectList.projects.filter(
        (p) => p.projectId !== id
      );
    }
    console.log(this.activeProjectList, this.finishedProjectList);
  }
}

App.init();

// App.connectSwitchButton('p1', 'finish-button');

// App.switchHandler('p1', 'finish-button');

// App.switchHandler('p1', 'active-button');

