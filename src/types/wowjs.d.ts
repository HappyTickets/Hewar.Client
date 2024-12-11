declare module 'wowjs' {
  export class WOW {
    constructor(options?: {
      boxClass?: string;
      animateClass?: string;
      offset?: number;
      mobile?: boolean;
      live?: boolean;
      callback?: Function;
      scrollContainer?: string;
    });

    init(): void;
    sync(): void;
    resetStyle(): void;
    start(): void;
    stop(): void;
    show(element: Element): void;
    applyStyle(element: Element, hidden?: boolean): void;
  }

  export default WOW;
}