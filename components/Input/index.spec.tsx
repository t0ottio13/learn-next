import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import { Input } from './index';

// describeで処理をまとめてる
describe("Input", () => {
    let renderResult: RenderResult;

    // テストケース前にコンポーネントを描画し、renderResultにセット
    beforeEach(() => {
        renderResult = render(<Input id="username" label="Username"/>);
    });

    // テスト後にコンポーネントを解放
    afterEach(() => {
        renderResult.unmount();
    });

    // これがテスト本体
    // LabelがUsernameであるコンポーネントに対するinputの要素を取得する
    it('should empty in input on initial render', ()=> {
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        // inputの要素が空か確認する
        expect(inputNode).toHaveValue('')
    })

    // 文字を入力したら、入力した内容が表示されるかテスト
    it('should show input text', () => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        // fireEventを使って、input要素のChangeイベントを発火する
        fireEvent.change(inputNode, { target: { value: inputText} })

        expect(inputNode).toHaveValue(inputText)
    })

    // ボタンが押されたら、入力テキストがクリアするかチェック
    it('should reset when user click button', async () => {
        const inputText = 'Text Input Test'
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        fireEvent.change(inputNode, { target: {inputText}})

        const buttonNode = screen.getByRole('button', {
            name: 'Reset',
        }) as HTMLButtonElement

        fireEvent.click(buttonNode)

        expect(inputNode).toHaveValue
    })
})