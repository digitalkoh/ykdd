import React from 'react'
import CheckIcon from '@material-ui/icons/Check';
import IconButton from './IconButton'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';

export default function SummaryFooter({ songInfo, cureTxtStyle, setCureTxtStyle, cureTxtAlign, setCureTxtAlign }) {
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
                    <IconButton 
                        onClick={() => {handleClickAlign('')}}
                        icon={<FormatAlignLeftIcon style={{ fontSize: 24, opacity: cureTxtAlign === '' ? '1' : '.1'}} />}
                        style={{ marginRight: '12px'}}
                        label={'Left'}
                    />

                    <IconButton 
                        onClick={() => {handleClickAlign('txt-center')}}
                        icon={<FormatAlignCenterIcon style={{ fontSize: 24, opacity: cureTxtAlign === 'txt-center' ? '1' : '.1' }} />}
                        style={{ marginRight: '12px'}}
                        label={'Center'}
                    />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton 
                        onClick={() => {handleClickStyle('')}}
                        icon={<CheckIcon className='ico-check' style={{ fontSize: 30, opacity: cureTxtStyle === '' ? '1' : '.1'}} />}
                        style={{ marginRight: '12px'}}
                        label={'Handwriting'}
                    />

                    <IconButton 
                        onClick={() => {handleClickStyle('txt-normal')}}
                        icon={<CheckIcon className='ico-check' style={{ fontSize: 30, opacity: cureTxtStyle === 'txt-normal' ? '1' : '.1' }} />}
                        label={'Normal'}
                    />
                </div>
            </div>
        </div>
    )
}
