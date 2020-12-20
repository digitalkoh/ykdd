
import React from  'react';
import './starapione.css';
import axios from 'axios';

const { useState, useEffect, useRef } = React;

const fetchRandomData = (pageNumber, rover, solDate, apiKey) => {

    return axios
        .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${solDate}&page=${pageNumber}&api_key=${apiKey}`)
        .then(({data}) => data)
        .catch((err) => {
            console.log(err)
        })
} 


// { "photos": [ 
//     { 
//         "id": 102685, 
//         "sol": 1004, 
//         "camera": { 
//             "id": 20, 
//             "name": "FHAZ", 
//             "rover_id": 5, 
//             "full_name": "Front Hazard Avoidance Camera" 
//         }, 
//         "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG", 
//         "earth_date": "2015-06-03", 
//         "rover": { 
//             "id": 5, 
//             "name": "Curiosity", 
//             "landing_date": "2012-08-06", 
//             "launch_date": "2011-11-26", 
//             "status": "active" 
//         } 
//     }

const getFullRoverInfo = (roverInfo) => {
    //const {sol, earth_date, camera: {full_name, name}, rover: {landing_date, launch_date, status, name}} = roverInfo;
    return  (
        <div style={{padding: '22px', border: 'solid 3px #ccc'}}>
            <div>Rover Name: {roverInfo.rover.name}</div>
            <div>sol: {roverInfo.sol}</div>
            <div>Earth Date: {roverInfo.earth_date}</div>
            <div>Camera: {roverInfo.camera.full_name} ({roverInfo.camera.name})</div>
            <div>Landing Date: {roverInfo.rover.landing_date}</div>
            <div>Launch Date: {roverInfo.rover.launch_date}</div>
            <div>Status: {roverInfo.rover.status}</div>
        </div>
    )
    
}

const StarApiOne = () => {
    const [nextPageNumber, setNextPageNumber] = useState(1);
    const [roverInfo, setRoverInfo] = useState([]);
    const [roverName, setRoverName] = useState('curiosity');
    const [sol, setSol] = useState(900);
    const [camera, setCamera] = useState('fhaz');
    const apiKEY = 'DEMO_KEY';

    const fetchNextSet = useRef(() => {});
    fetchNextSet.current = () => {
        fetchRandomData(nextPageNumber, roverName, sol, apiKEY).then(randomData => {
             console.log(nextPageNumber)
            if (randomData === undefined) return;
            
            if (randomData.photos.length < 1) {
                return console.log('no data')
            };
            
            const newInfos = [
                ...randomData.photos
            ]
            setRoverInfo(newInfos);
        })
    };

    useEffect(() => {
        fetchNextSet.current();
    }, [nextPageNumber, roverName])

    return (
        <div data-scope-starapione>
            {roverInfo.length > 0 && getFullRoverInfo(roverInfo[0])}
            {nextPageNumber}<br />
            
            {nextPageNumber > 1 && <button onClick={() => {setNextPageNumber(nextPageNumber - 1)}}>Prev</button>}
            <button onClick={() => {setNextPageNumber(nextPageNumber + 1)}}>Next</button>
            <button onClick={() => {setRoverName('curiosity')}}>Curiosity</button>
            <button onClick={() => {setRoverName('opportunity')}}>Opportunity</button>
            
            
            <div style={{display: 'flex', width: '80%', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                {
                    roverInfo.map((roverInfo, idx) => (
                        <div key={idx}>
                            <img style={{width: '80px', height: '80px'}} alt="NASA" src={roverInfo.img_src} />
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default StarApiOne;