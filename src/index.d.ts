declare module 'webpack';
declare module 'tapable';
declare module 'dist';
declare module 'path';

declare module "*.svg" {
  const content: any;
  export default content;
}