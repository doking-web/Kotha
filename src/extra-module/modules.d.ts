
declare module "watch" {
    function watchTree(path: string,callback: Function): void;
}

declare function fn(responseHandeler: any, option: any): Promise<any>;
declare module "reload" {
    export default fn;
}
