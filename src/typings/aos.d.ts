
declare module 'aos' {
    export interface AOS {
      init(options?: any): void;
    }
  
    const AOS: AOS;
    export default AOS;
  }