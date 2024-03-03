import { Component } from "./component/component.js";
import { InputDialog } from "./component/dialog/dialog.js";
import { ImageComponent } from "./component/page/item/image.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { VideoComponent } from "./component/page/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./component/page/page.js";

class App {
  private readonly page: Component & Composable;
  // 우리 어플리케이션을 추가할 최상위 루트 요소를 받아옴
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      "Video Title",
      "https://www.youtube.com/watch?v=8rqiKDZ6wYw&ab_channel=IVE"
    );
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "This is super note!");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", "todo");
    this.page.addChild(todo);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();

      dialog.SetOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.SetOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가해준다
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });
  }
}

// querySelector는 null type이 될 수도 있기 때문에 정말 확실한 경우에만 ! 사용
new App(document.querySelector(".document")! as HTMLElement);
