import React from 'react'
import CheckIcon from '@material-ui/icons/Check';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';

export default function SummaryFooter({ songInfo, cureTxtStyle, setCureTxtStyle, setCureTxtAlign }) {
    const handleClickStyle = (val) => {
        setCureTxtStyle(val)
    }
    const handleClickAlign = (val) => {
        setCureTxtAlign(val)
    }
    return (
        <div className='summary songFooter'>
            <div style={{ marginRight: '12px'}}>
                <div className='summary-txtSmall'>Title: {songInfo.title}</div> 
                <div className='summary-txtSmall'>Album: {songInfo.album} ({songInfo.albumYear}, {songInfo.albumType})</div>
                <div className='summary-txtSmall'>Song Year: {songInfo.songYear}</div>
                <div className='summary-txtSmall'>{songInfo.note}</div>
            </div>

            <div className='footerButtonGroup'>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <div className='button' style={{ marginRight: '12px'}} onClick={() => {handleClickAlign('')}}>
                        <FormatAlignLeftIcon style={{ fontSize: 24}} /> Left
                    </div>

                    <div className='button' style={{ marginRight: '12px'}} onClick={() => {handleClickAlign('txt-center')}}>
                        <FormatAlignCenterIcon style={{ fontSize: 24 }} /> Center
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <div className='button' style={{ marginRight: '12px'}} onClick={() => {handleClickStyle('')}}>
                        <CheckIcon className='ico-check' style={{ fontSize: 30, opacity: cureTxtStyle === '' ? '1' : '.1'}} /> Handwriting
                    </div>

                    <div className='button' onClick={() => {handleClickStyle('txt-normal')}}>
                        <CheckIcon className='ico-check' style={{ fontSize: 30, opacity: cureTxtStyle === 'txt-normal' ? '1' : '.1' }} /> Normal
                    </div>
                </div>
            </div>
        </div>
    )
}
