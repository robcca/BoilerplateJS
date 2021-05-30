class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.prepend(element);
  }
}

class ProjectItem {
  constructor(id, type) {
    this.projectId = id;
    this.type = type;
  }

  connectSwitchButton() {
    const buttonId =
      this.type === 'active' ? 'finish-button' : 'activate-button';
    const projectItemElement = document.getElementById(this.projectId);
    const switchButton = projectItemElement.querySelector(buttonId);
    switchButton.addEventListener('click', App.switchHandler);
    // switchButton.addEventListener('click', this.switchHandler(id, buttonId));
  }
}

// In App we will instantiate two lists from this class,
// 'active' and 'finished':
class ProjectList {
  // Field declarations here run before constructor logic but
  // after super declaration.
  projects = [];

  constructor(type) {
    // type of project
    this.type = type;
    // Collect the list items in the DOM with
    // the CSS selector of the appropriate type:
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id, type)); // 'id' in HTML
    }
  }
}

class App {
  static init() {
    // create active project list
    const activeProjectList = new ProjectList('active');
    this.activeProjectList = activeProjectList;
    // create finished project list
    const finishedProjectList = new ProjectList('finished');
    this.finishedProjectList = finishedProjectList;

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

App.connectSwitchButton('p1', 'finish-button');

// App.switchHandler('p1', 'finish-button');

// App.switchHandler('p1', 'active-button');
