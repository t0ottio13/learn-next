import { useState, useEffect } from 'react';

function Sayhello(){

    // 内部で状態を持つため
    const[data, setData] = useState({name: ''})

    // 外部APIにリクエストするのは副作用らしい
    // useEffect内で処理
    useEffect(() => {
        fetch('api/hello')
            .then((res) => res.json())
            .then((profile) => {
                setData(profile)
            })
    }, [])

    return <div>hello {data.name}</div>
}

export default Sayhello;