import Component from "./base-component";
import { Project } from "../models/project";
import { Draggable } from "../models/drag-drop";
import { autobind } from "../decorators/autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  constructor(hostId: string, private project: Project) {
    super('single-project', hostId, false, project.id)
    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move';
  };

  @autobind
  dragEndHandler(_: DragEvent) {};

  get persons() {
    if (this.project.people === 1) {
      return '1 person'
    } else {
      return `${this.project.people} persons`
    }
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}