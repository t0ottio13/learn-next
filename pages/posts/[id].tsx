import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from 'next/head';
import { useRouter } from "next/router"; // next/routerからuseRouterというフックを取り込む

// エラーになるので追加
import { ParsedUrlQuery } from 'node:querystring'


type PostProps = {
    id: string
}

const Post: NextPage<PostProps> = (props) => {
    const { id } = props;
    const router = useRouter();

    if(router.isFallback){

        // フォールバックページ向けの表示を返す
        return <div>Loading...</div>
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>
            <main>
                <p>このページは静的サイト生成によってビルド時に生成されたページです。</p>
                <p>{`/posts/${id}に対応するページです`}</p>
            </main>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [
        {
            params: {
                id: '1',
            },
        },
        {
            params: {
                id: '2',
            },
        },
        {
            params: {
                id: '3',
            },
        },
    ]

    return { paths, fallback: false}
}

// エラーになるので追加
// 調べたページ
// https://gihyo.jp/book/2022/978-4-297-12916-3/support#supportApology
// https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type
// Paramsの型を定義し、ParsedUrlQueryをextendsする
interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async (context) => {

    // エラーになるのでコメントアウト
    // const id = Array.isArray(context.params['id'])
    //     ? context.params['id'][0]
    //     : context.params['id']

    return {

        // エラーになるのでコメントアウト
        // props: {
        //     id,
        // },

        // posts/1~3でページが表示され、posts/4~ではNotFoundになる挙動が確認できた
        // 2022/11/07
        props: {
            id: context.params!['id'],
        },
    }
}

export default Post;