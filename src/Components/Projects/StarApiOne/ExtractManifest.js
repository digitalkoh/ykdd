import React from 'react';

export const ExtractManifest = ({ manifestInfo }) => {
    return  (
        <>  
            {
            manifestInfo && 
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
            }
        </>
    )
}