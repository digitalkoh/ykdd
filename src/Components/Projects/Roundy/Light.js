import React from  'react'

export const Light = ({ lit, idx, width, height, posX, posY, value }) => {
    
    const lightSyles = {
        // width: `${width}px`,
        // height: `${height}px`,
        width: `${lit}-lit` === `${idx}-lit` ? `${width + 4}px` : `${width}px`,
        height: `${lit}-lit` === `${idx}-lit` ? `${height + 4}px` : `${height}px`,
        top: `${posY}px`,
        left: `${posX}px`
    }
    
    let visible = `${lit}-lit` === `${idx}-lit` ? 'visible' : 'hidden' 
    let woncolor = `${lit}-lit` === `${idx}-lit` ? 'woncolor' : '' 

    return (
        <>  
            <div className="lightBulb" style={{...lightSyles}}>
                {value > 0 && <div className={`pointLight ${woncolor}`}>{value}</div>}
                <div className="activeLight" style={{ visibility : visible }}></div>
            </div>
        </>
    )
}