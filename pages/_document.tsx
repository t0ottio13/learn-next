import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// _documentはカスタムドキュメントと呼ばれるもの
// heml,head,body要素を書き換えるために使用する
export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext){
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => 
                originalRenderPage({
                    enhanceApp: (App) => (props) => 
                        sheet.collectStyles(<App {...props}/>),
                })

                // ドキュメントを初期化している
                const initialProps = await Document.getInitialProps(ctx)

                // 初期化したドキュメントにStyleを追加して返す
                return {
                    ...initialProps,
                    style: [
                        // もともとのスタイル
                        initialProps.styles,

                        // こっちがstyled-componentsのstyle
                        sheet.getStyleElement()
                    ],
                }
        }finally{
            sheet.seal()
        }
    }
}