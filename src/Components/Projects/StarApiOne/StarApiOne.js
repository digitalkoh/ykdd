
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
            <div className='dates'>
                <div><label>Martian Sol</label> {roverInfo.sol}</div>
                <div><label>Earth Date</label> {roverInfo.earth_date}</div>
            </div>
        </>
    )
}

const extractManifest = (manifestInfo) => {
    return  (
        <>  
            <div className='col'>
                <div><label>Rover Name</label> {manifestInfo.name}</div>
                <div><label>Launched</label> {manifestInfo.launch_date}</div>
                <div><label>Landed</label> {manifestInfo.landing_date}</div>
                <div><label>Mission Status</label> <span className={manifestInfo.status ==='active' ? 'activestatus' : ''} >{manifestInfo.status}</span></div>
            </div>
            <div className='col'>
                <div><label>Most Recent Photo</label> {manifestInfo.max_date}</div>
                <div><label>Total Sol</label> {manifestInfo.max_sol}</div>
                <div><label>Total Number of Photos</label> {manifestInfo.total_photos}</div>
            </div>
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
    const [noImg, setNoImg] = useState(false);
    const [clickedWith, setClickedWith] = useState('');
    // const [camera, setCamera] = useState('fhaz');
    const apiKEY = 'DEMO_KEY';

    const fetchNextSet = useRef(() => {});
    const fetchNextMani = useRef(() => {});
    const jumpToSol = useRef(() => {});
    const jumpToInput = useRef();

    // Jump to Sol ==========================================================
    jumpToSol.current = () => {
        const maxsol = manifestInfo[0].max_sol;
        let gotonum = parseInt(jumpToInput.current.value);
        gotonum > maxsol && alert('Sol date cannot be greater than the total number of sol days ' + manifestInfo[0].name + ' was on Mars. ' + manifestInfo[0].name + ' was on mars for ' + maxsol + ' sol days.');
        gotonum <= maxsol && setSol(gotonum); setResetPageOnly(true);
    }

    // Fetch rover info ==========================================================
    fetchNextSet.current = () => {
        fetchPhotoData(nextPageNumber, roverName, sol, apiKEY).then(randomData => {
            setNoImg(false);

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

                // Clear jump to input
                jumpToInput.current.value = null
            }

            if (randomData === undefined) return;
            if (randomData.photos.length < 1) {
                setNoImg(true);
                console.log('no data')
            };
            
            const newInfos = [
                ...randomData.photos
            ]
            setRoverInfo(newInfos);
            setResetPageOnly(false);

            // console.log(roverInfo)
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

    // Grab new manifest if rover has changed
    useEffect(() => {
        fetchNextMani.current();
    }, [roverName])


    // Submit Jump on 'Enter' key
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                jumpToSol.current()
            }
        };
        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <div data-scope-starapione>
            <h1>NASA Mars Rover Photos</h1>
            <div className='imageControls'>
                <div className='roverSelect'>
                    <div className='buttons'>
                        <button 
                                className={roverName !== '' && roverName === 'curiosity' ? 'active' : ''}
                                style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/marsrover-curiosity.jpg )`}}
                                title='Curiosity'
                                onClick={() => {setRoverName('curiosity'); setResetDateAndPage(true)}} />
                        <button 
                                className={roverName !== '' && roverName === 'opportunity' ? 'active' : ''} 
                                style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/marsrover-opportunity.jpg )`}}
                                title='Opportunity'
                                onClick={() => {setRoverName('opportunity'); setResetDateAndPage(true)}} />
                        <button 
                                className={roverName !== '' && roverName === 'spirit' ? 'active' : ''} 
                                style={{backgroundImage: `url( ${process.env.PUBLIC_URL}/img/marsrover-spirit.jpg )`}} 
                                title='Spirit'
                                onClick={() => {setRoverName('spirit'); setResetDateAndPage(true)}} />
                    </div>
                    <div className='roverInfo'>
                        {manifestInfo.length > 0 && extractManifest(manifestInfo[0])}
                    </div>
                </div>
                
                <div className='navigation'>
                    <div className='solSelect'>
                        <div><label>Sol</label> {sol} <span>Solar day on Mars (24h, 39m, 35s)</span></div>
                        <div style={{display: 'flex'}}>
                            {
                                sol > 0 ? 
                                <button onClick={() => {setSol(sol - 1); setResetPageOnly(true); setClickedWith(`No photo taken on sol ${sol-1}.`)}}>Previous Sol</button> 
                                : 
                                <button disabled >Previous Sol</button>
                            }
                            {   
                                manifestInfo.length > 0 && 
                                sol < manifestInfo[0].max_sol ? 
                                <button onClick={() => {setSol(sol + 1); setResetPageOnly(true); setClickedWith(`No photo taken on sol ${sol+1}.`)}}>Next Sol</button> 
                                : 
                                <button disabled >Next Sol</button>
                            }
                            <button onClick={() => {setSol(manifestInfo[0].max_sol); setResetPageOnly(true)}}>Most Recent Photos</button>

                            <div>
                                <input type='number' placeholder='Sol #' ref={jumpToInput} className='jumpto' />
                                <button onClick={() => {jumpToSol.current()}}>Go</button>
                            </div>
                        </div>
                    </div>

                    <div className='pagination'>
                        <div><label>Page</label> {roverInfo.length > 0 ? nextPageNumber : 'unavailable'}</div>
                        {
                            nextPageNumber > 1 ? 
                            <button onClick={() => {setNextPageNumber(nextPageNumber - 1); setClickedWith('No images available on this page.')}}>Previous Page</button> 
                            : 
                            <button disabled >Previous Page</button>
                        }
                        {
                            roverInfo.length > 0 ? 
                            <button onClick={() => {setNextPageNumber(nextPageNumber + 1); setClickedWith(`End of images on sol ${sol}.`)}}>Next Page</button>
                            : 
                            <button disabled >Next Page</button>
                        }
                    </div>
                </div>
                {roverInfo.length > 0 && getPhotoDates(roverInfo[0])}
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

                {noImg && <p className='message'>{clickedWith}</p>}
            </div>

            <div className='projectDesc' style={{borderTop: 'solid 1px #333', color: '#777'}}>
                Built with: React / JSX / ES6 / Javascript / Axios & NASA Rover Photos API
            </div>
            
        </div>
    )
}

export default StarApiOne;