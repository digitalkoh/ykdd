
import React from  'react';
import './starapione.css';
import axios from 'axios';

const { useState, useEffect, useRef } = React;

const fetchPhotoData = (pageNumber, rover, solDate, apiKey) => {
    return axios
        .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${solDate}&page=${pageNumber}&api_key=${apiKey}`)
        .then(({data}) => data)
        .catch((err) => {
            console.log(err)
        })
} 

const fetchManifests = (rover, apiKey) => {
    return axios
        .get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`)
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

const getPhotoDates = (roverInfo) => {
    //const {sol, earth_date, camera: {full_name, name}, rover: {landing_date, launch_date, status, name}} = roverInfo;
    return  (
        <>
            <div>Martian Sol: {roverInfo.sol}</div>
            <div>Earth Date: {roverInfo.earth_date}</div>
        </>
    )
}

const extractManifest = (manifestInfo) => {
    return  (
        <>  
            <div>Rover Name: {manifestInfo.name}</div>
            <div>Launch Date: {manifestInfo.launch_date}</div>
            <div>Landing Date: {manifestInfo.landing_date}</div>
            <div>Status: {manifestInfo.status}</div>
            <div>Most Recent Photo Date: {manifestInfo.max_date}</div>
            <div>Total Sol: {manifestInfo.max_sol}</div>
            <div>Total Number of Photos: {manifestInfo.total_photos}</div>
        </>
    )
}

const StarApiOne = () => {
    const [nextPageNumber, setNextPageNumber] = useState(1);
    const [resetDateAndPage, setResetDateAndPage] = useState(false);
    const [resetPageOnly, setResetPageOnly] = useState(false);
    const [roverInfo, setRoverInfo] = useState([]);
    const [manifestInfo, setManifestInfo] = useState({});
    const [roverName, setRoverName] = useState('curiosity');
    const [sol, setSol] = useState(0);
    // const [camera, setCamera] = useState('fhaz');
    const apiKEY = 'DEMO_KEY';

    const fetchNextSet = useRef(() => {});
    const fetchNextMani = useRef(() => {});

    // Fetch rover info ==========================================================
    fetchNextSet.current = () => {
        fetchPhotoData(nextPageNumber, roverName, sol, apiKEY).then(randomData => {
            
            console.log('page: ' + nextPageNumber)
            console.log('sol: ' + sol)
            console.log('rover: ' + roverName)
            
            // Reset page and date when new rover is selected
            if(resetDateAndPage) {
                setNextPageNumber(1);
                // Opportunity and Spirit do not have any photos on SOL 0, therefore, default to 1.
                roverName === 'opportunity' || 'spirit' ? setSol(1) : setSol(0);

                setResetDateAndPage(false)
            }

            // Reset to oage 1 on new SOL date
            if(resetPageOnly) {
                setNextPageNumber(1);
                setResetPageOnly(false)
            }

            if (randomData === undefined) return;
            if (randomData.photos.length < 1) {
                console.log('no data')
            };
            
            const newInfos = [
                ...randomData.photos
            ]
            setRoverInfo(newInfos);
        })
    };

    // Fetch Manifest info ==========================================================
    fetchNextMani.current = () => {
        fetchManifests(roverName, apiKEY).then(manData => {
            if (manData === undefined) return;
            
            const newInfos = [
                manData.photo_manifest
            ]
            setManifestInfo(newInfos);
        })
    }

    useEffect(() => {
        fetchNextSet.current();
    }, [nextPageNumber, roverName, sol])

    useEffect(() => {
        fetchNextMani.current();
    }, [roverName])

    return (
        <div data-scope-starapione>
            <div className='imageControls'>
                <div className='roverSelect'>
                    <button onClick={() => {setRoverName('curiosity'); setResetDateAndPage(true)}}>Curiosity</button>
                    <button onClick={() => {setRoverName('opportunity'); setResetDateAndPage(true)}}>Opportunity</button>
                    <button onClick={() => {setRoverName('spirit'); setResetDateAndPage(true)}}>Spirit</button>
                </div>

                <div className='roverInfo'>
                    {manifestInfo.length > 0 && extractManifest(manifestInfo[0])}
                </div>
                
                <div className='solSelect'>
                    Sol: {sol}<br />
                    {
                        sol > 0 ? 
                        <button onClick={() => {setSol(sol - 1); setResetPageOnly(true)}}>Previous Sol</button> 
                        : 
                        <button disabled >Previous Sol</button>
                    }
                    {   
                        manifestInfo.length > 0 && 
                        sol < manifestInfo[0].max_sol ? 
                        <button onClick={() => {setSol(sol + 1); setResetPageOnly(true)}}>Next Sol</button> 
                        : 
                        <button disabled >Next Sol</button>
                    }
                    <button onClick={() => {setSol(manifestInfo[0].max_sol); setResetPageOnly(true)}}>Most Recent Photos</button>
                </div>
                <div className='pagination'>
                    {nextPageNumber}<br />
                    {nextPageNumber > 1 ? <button onClick={() => {setNextPageNumber(nextPageNumber - 1)}}>Previous Page</button> : <button disabled >Previous Page</button>}
                    <button onClick={() => {setNextPageNumber(nextPageNumber + 1)}}>Next Page</button>
                    {roverInfo.length > 0 && getPhotoDates(roverInfo[0])}
                </div>
            </div>
            
            <div id="nasaimages">
                {
                    roverInfo.map((roverInfo, idx) => (
                        <div className='imgContainer' key={idx}>
                            {/* <div>{roverInfo.camera.full_name}</div> */}
                            <img alt="NASA" src={roverInfo.img_src} />
                        </div>
                    ))
                }
            </div>

            <div className='projectDesc' style={{borderTop: 'solid 1px #333', color: '#777'}}>
                Built with: React / JSX / ES6 / Javascript / Axios & NASA Rover Photos API
            </div>
            
        </div>
    )
}

export default StarApiOne;