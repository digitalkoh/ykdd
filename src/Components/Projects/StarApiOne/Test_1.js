import React from  'react';
import './starapione.css';

const { useState } = React;
//const { useRef } = React;
const { useEffect } = React;

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         const [item] = data.results;
    //         setData(item);
    //         setLoading(false)
    //     }
    //     fetchData();
    // } ,[url]);

    // An anonymous fuction that call itself.
    useEffect(() => {
        (async () => {
            let response = await fetch(url);
            response = await response.json();
            //const [item] = response.results;
            setData(response.results);
            setLoading(false)
           
        })();
    } ,[url]);
    
    //  JSON.stringify(response.results)
            // console.log(JSON.stringify(response.results))
    return {data, loading}
    
};

const StarApiOne = () => {
    const [count, setCount] = useState(0);
    const {data, loading} = useFetch('https://randomuser.me/api');
    //const mydata = JSON.stringify(data)
    //console.log(data)
    let putthis = '';
    data && 
        data.forEach(item => {
            putthis += `<div>${item.display_title}</div>`
        })
                

    return (
        <div data-scope-starapione>
                <p>Hi</p>
                <button onClick={() => setCount(count + 1)}>Click Me</button>
                {putthis}
                 {/* {loading ? <div>...Loading</div> : <div>{data.display_title} <hr />{data.byline}<hr /><a href={data.link.url}>{data.link.suggested_link_text}</a></div>} */}
        </div>
    )
}

export default StarApiOne;