import { Component } from "./component/component.js";
import { ImageComponent } from "./component/page/item/image.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { VideoComponent } from "./component/page/item/video.js";
import { Composable, PageComponent } from "./component/page/page.js";

class App {
  private readonly page: Component & Composable;
  // 우리 어플리케이션을 추가할 최상위 루트 요소를 받아옴
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
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
  }
}

// querySelector는 null type이 될 수도 있기 때문에 정말 확실한 경우에만 ! 사용
new App(document.querySelector(".document")! as HTMLElement);
