import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="image">
            <div class="image__holder"><img class="image__thumbnail" /></div>
            <h2 class="page-item__title image__title"></h2>
            </section>`);

    const imageElememt = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;
    imageElememt.src = url;
    imageElememt.alt = title;

    const titleElement = this.element.querySelector(
      ".image__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
}
