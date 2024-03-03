import { Draggable, Droppable, Hoverable } from "../component/common/type.js";
import { Component } from "./../component/component.js";

type GConstructor<T = {}> = new (...args: any[]) => T;
type DraggableClass = GConstructor<Component & Draggable>;

// 아무 class나 감싸는 것이 아니라 Component와 Draggable를 규격하고 있는 class만 감쌀 수 있음
// TBase타입의 class를 받아와서 그 class의 생성자를 한단계 감싸줌
export function EnableDragging<TBase extends DraggableClass>(Base: TBase) {
  return class DraggableItem extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener("dragstart", (event: DragEvent) => {
        this.onDragStart(event);
      });
      this.registerEventListener("dragend", (event: DragEvent) => {
        this.onDragEnd(event);
      });
    }
  };
}

type DragHoverClass = GConstructor<Component & Hoverable>;

export function EnableHover<TBase extends DragHoverClass>(Base: TBase) {
  return class DragHoverArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener("dragenter", (event: DragEvent) => {
        event.preventDefault();
        this.onDragEnter(event);
      });
      this.registerEventListener("dragleave", (event: DragEvent) => {
        this.onDragLeave(event);
      });
    }
  };
}

type DropTargetClass = GConstructor<Component & Droppable>;

export function EnableDrop<TBase extends DropTargetClass>(Base: TBase) {
  return class DropArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener("dragover", (event: DragEvent) => {
        event.preventDefault();
        this.onDragOver(event);
      });
      this.registerEventListener("drop", (event: DragEvent) => {
        event.preventDefault();
        this.onDrop(event);
      });
    }
  };
}
