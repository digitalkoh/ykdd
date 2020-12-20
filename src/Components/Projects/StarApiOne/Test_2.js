
import React from  'react';
import './starapione.css';
import axios from 'axios';

const { useState, useEffect, useRef } = React;

const fetchRandomData = (pageNumber) => {
    // ?page=2
    return axios
        .get(`https://randomuser.me/api?page=${pageNumber}`)
        .then(({data}) => data)
        .catch((err) => {
            console.log(err)
        })
} 

const getFullUserName = (userInfo) => {
    const {name: {first, last}} = userInfo;
    return `${first} ${last}`;
}

const StarApiOne = () => {
    const [nextPageNumber, setNextPageNumber] = useState(1);
    const [userInfos, setUserInfos] = useState([]);
    // const [randomUserDataJSON, setRandomUserDataJSON] = useState('');

    // Ref'd fetchNextUser to a function to remove useEffect linter warning
    const fetchNextUser = useRef(() => {});

    fetchNextUser.current = () => {
        fetchRandomData(nextPageNumber).then(randomData => {
            // setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || "error yo");
            if (randomData === undefined) return;
            const newUserInfoes = [
                ...userInfos,
                ...randomData.results
            ]
            setUserInfos(newUserInfoes);
            setNextPageNumber(randomData.info.page + 1)
        })
    };

    useEffect(() => {
        fetchNextUser.current();
    }, [])

    return (
        <div data-scope-starapione style={{display: 'flex', width: '80%', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
            {/* <div><pre>{randomUserDataJSON}</pre></div> */}

            <button 
                onClick={() => {
                    fetchNextUser.current()
                }}
            >
                Fetch Next User
            </button>

            {
                userInfos.map((userInfo, idx) => (
                    <div key={idx}>
                        <div>{getFullUserName(userInfo)}</div>
                        <img alt="" src={userInfo.picture.medium} />
                    </div>
                ))
            }
        </div>
    )
}

export default StarApiOne;