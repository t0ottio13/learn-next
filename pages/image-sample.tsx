import { NextPage } from 'next';
import Image from 'next/image';

import BibleImage from '../public/images/bible.png'

const ImageSample: NextPage<void> = ( props ) => {
    return (
        <div>
            <h1>画像表示の比較</h1>

            {/* 通常のimgタグを使用して画像を表示 */}
            <p>imgタグを使用して画像を表示</p>
            <img src="./images/bible.png"/>

            {/* Imageコンポーネントで表示した場合 */}
            <p>Imageコンポーネンを使用して表示</p>
            <Image 
                src={BibleImage}
                alt="SamplePicture"
            />
            <p>Imageで表示した場合は事前に描画エリアが確保されます</p>
        </div>
    )
}

export default ImageSample;