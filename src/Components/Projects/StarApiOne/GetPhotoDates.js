import React from 'react';

export const GetPhotoDates = ({ roverInfo }) => {

    // const {sol, earth_date, camera: {full_name, name}, rover: {landing_date, launch_date, status, name}} = roverInfo;
    return  (
        <>
            { 
                roverInfo && 
                <div className='dates'>
                    <div><label>Martian Sol</label> {roverInfo.sol}</div>
                    <div><label>Earth Date</label> {roverInfo.earth_date}</div>
                </div>
            }
        </>
    )
}

