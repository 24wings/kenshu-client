/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// declare var marked: any;
declare var marked: (str: string) => string;
