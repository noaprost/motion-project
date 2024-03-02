export interface Component {
  attachTo: (parent: HTMLElement, position?: InsertPosition) => void;
  removeFrom(parent: HTMLElement): void;
}

/**
 * Encapsulate the HTML element creation
 */
// T: HTMLElement 이거나 HTMLElement를 상속하는 서브클래스
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  // PageComponent를 만들어서 필요한 곳에 페이지를 추가할 수 있는 api
  // 인자로 부모 컨테이너를 받아서 부모의 position에 추가해줌
  attachTo(parent: HTMLElement, position: InsertPosition = "beforeend") {
    // insertAdjacentElement: position과 추가하고 싶은 element를 전달하면 부모 요소에 추가해줌
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error("Parent mismatch!");
    }
    parent.removeChild(this.element);
  }
}
