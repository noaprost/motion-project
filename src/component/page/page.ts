import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild: (child: Component) => void;
}

type OnCloseListener = () => void;

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);

    const buttonElement = this.element.querySelector(
      ".close"
    )! as HTMLButtonElement;

    buttonElement.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }
  // Component를 규격한 어떤 아이든지 prop으로 받을 수 있음
  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnClickListner(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

// 페이지의 부모 컨테이너에 대한 요소를 담고 있음
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<ul class="page"></ul>`);
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element);
    item.setOnClickListner(() => {
      item.removeFrom(this.element);
    });
  }
}
