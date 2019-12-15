declare module "*.css";
declare module "*.scss";
declare module "*.less";
declare module "*.styl";
declare module "*.png";

declare namespace NodeJS {
  interface Process {}
  interface Global {
    [x: string]: any;
  }
}
