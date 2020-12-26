import React from  'react';
import './starapione.css';
import axios from 'axios';
import Paginator from './Paginator';
import SolSelector from './SolSelector';
import RoverButton from './RoverButton';
import NasaImages from './NasaImages';
import { bunho } from '../Temp';
import { GetPhotoDates } from './GetPhotoDates';
import { ExtractManifest } from './ExtractManifest';
import { ProjectFooter } from './ProjectFooter';
import { scrollTo } from '../../GlobalScrollTo';
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
    const apiKEY = bunho;

    const fetchNextSet = useRef(() => {});
    const fetchNextMani = useRef(() => {});

    // Handle events coming from components =========================
    const handlePaginate = (num, msg) => {
        setNextPageNumber(num); 
        setClickedWith(msg)
    };
    const handleSolJump = (sol, reset) => {
        setSol(sol); setResetPageOnly(reset)
    };
    const handleSolMax = (sol, reset) => {
        setSol(sol); 
        setResetPageOnly(reset)
    };
    const handleSolNav = (sol, reset, msg) => {
        setSol(sol); 
        setResetPageOnly(reset); 
        setClickedWith(msg)
    };
    const handleRoverSwitch = (name, reset) => {
        setRoverName(name); 
        setResetDateAndPage(reset)
    };

    // Fetch rover info ==========================================================
    fetchNextSet.current = () => {
        fetchPhotoData(nextPageNumber, roverName, sol, apiKEY).then(randomData => {
            setNoImg(false);

            if (window.pageYOffset > 240) {
                scrollTo(320)
            }

            // Reset page and date when new rover is selected
            if(resetDateAndPage) {
                setNextPageNumber(1);
                // Opportunity and Spirit do not have any photos on SOL 0, therefore, default to 1.
                roverName === 'opportunity' || 'spirit' ? setSol(1) : setSol(0);
                setResetDateAndPage(false);
            }

            // Reset to page 1 on new SOL date
            if(resetPageOnly) {
                setNextPageNumber(1);
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

    return (
        <div data-scope-starapione>
            <h1>NASA Mars Rover Photos</h1>
            <div className='imageControls'>
                <div className='roverSelect'>
                    <RoverButton handleRoverSwitch={handleRoverSwitch} roverName={roverName} />

                    <div className='roverInfo'>
                        <ExtractManifest manifestInfo={manifestInfo[0]} />
                    </div>
                </div>
            </div>

            <div className='navigation'>
                <SolSelector 
                    handleSolJump={handleSolJump} 
                    handleSolNav={handleSolNav} 
                    handleSolMax={handleSolMax} 
                    manifestInfo={manifestInfo} 
                    sol={sol} 
                />
                <Paginator 
                    handlePaginate={handlePaginate} 
                    roverInfo={roverInfo} 
                    nextPageNumber={nextPageNumber} 
                    sol={sol} 
                />
            </div>

            <GetPhotoDates roverInfo={roverInfo[0]} />

            <NasaImages 
                roverInfo={roverInfo} 
                noImg={noImg} 
                clickedWith={clickedWith}
            />

            <ProjectFooter />
            
        </div>
    )
}

export default StarApiOne;