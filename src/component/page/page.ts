import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild: (child: Component) => void;
}

type OnCloseListener = () => void;

// 어떤 UI를 가지든 상관없지만 close 버튼이 있어서 꼭 setOnCloseListener를 가져야 한다는 규격
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

// 생성자를 정의하는 타입
type SectionContainerConstructor = {
  // 아무것도 전달받지 않는 생성자인데, SectionContainer를 구현하는 어떤 클래스든 상관 없는 생성자
  new (): SectionContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
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

  setOnCloseListener(listener: OnCloseListener): void {
    this.closeListener = listener;
  }
}

// 페이지의 부모 컨테이너에 대한 요소를 담고 있음
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
