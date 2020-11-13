declare module '*.less' {
    const content: any;
    export default content;
}

declare module '*.png';
declare module '*.gif';
declare module '*.jpeg';
declare module '*.jpg';

declare module '*.ts' {
    const content: any;
    export default content;
}

declare interface Window {
    ARTICLE_INDEX: Array<{
        title: string,
        categories: string[],
        date: string,
        description: string,
        tags: string[],
        hash: string,
        path: string,
    }>;
}