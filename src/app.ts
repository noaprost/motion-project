import { Component } from "./component/component.js";
import { InputDialog, MediaData, TextData } from "./component/dialog/dialog.js";
import { ImageComponent } from "./component/page/item/image.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { VideoComponent } from "./component/page/item/video.js";
import { MediaSectionInput } from "./component/dialog/input/media-input.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./component/page/page.js";
import { TextSectionInput } from "./component/dialog/input/text-input.js";

// extends와 =의 차이
// extends : 제약 조건을 명시함 (이 타입을 따라야 함!)
// = : 기본(default) 타입을 명시함
type InputComponentConstructor<T extends (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  // 우리 어플리케이션을 추가할 최상위 루트 요소를 받아옴
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );
    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );
    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );
    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    /**
     * For Demo
     */
    this.page.addChild(
      new ImageComponent("Image1", "https://picsum.photos/600/300")
    );
    this.page.addChild(new NoteComponent("Note1", "note1"));
    this.page.addChild(
      new VideoComponent(
        "IVE2",
        "https://www.youtube.com/watch?v=dPMZrxrhIbA&ab_channel=%EC%B9%A8%EC%B0%A9%EB%A7%A8"
      )
    );
    this.page.addChild(new TodoComponent("Todo1", "todo1"));
    this.page.addChild(new TodoComponent("Todo2", "todo2"));
    this.page.addChild(new NoteComponent("Note2", "note2"));
    this.page.addChild(
      new VideoComponent(
        "IVE1",
        "https://www.youtube.com/watch?v=rWY98qqgrBs&ab_channel=%EC%84%AD%EC%94%A8%EC%89%BD%EB%8F%84"
      )
    );
    this.page.addChild(
      new ImageComponent("Image2", "https://picsum.photos/600/300")
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.SetOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.SetOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가해준다
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

// querySelector는 null type이 될 수도 있기 때문에 정말 확실한 경우에만 ! 사용
new App(document.querySelector(".document")! as HTMLElement, document.body);
