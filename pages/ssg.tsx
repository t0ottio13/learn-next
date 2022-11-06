// 型のために導入
import { NextPage, GetStaticProps, NextPageContext } from 'next';

// Next.jsの組み込みコンポーネント
import Head from 'next/head';

// ページコンポーネントのpropsの型定義
type SSGProps = {
    message: string
}

// SSG向けのページを実装
// NextPageはNext.jsのPageであることを明示
// NextPage<props>の形で、propsが入ることを明示
const SSG: NextPage<SSGProps> = (props) => {
    const { message } = props;

    return (
        <div>
            {/* Headコンポーネントで包むと、その要素は<head>タグに配置されます */}
            <Head>
                <title>Static Site Generation</title>
                <link rel='icon' href='/favicon.iso'></link>
            </Head>
            <main>
                <p>
                    このページは静的サイト生成によってビルド時に生成されたページです
                </p>
            </main>
        </div>
    )
}

// http://localhost:3000/ssg
// ssgにルーティングされてる
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
    const timestamp = new Date().toLocaleString();
    const message = `${timestamp}にgetStaticPropsが実行されました`;
    console.log(message);

    return {
        // ここで返したpropsを元にページコンポーネント描画する
        props: {
            message,
        },
    }
}

// え、exportが二個！？

export default SSG;