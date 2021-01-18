import React from 'react'
import coverdata from './coverart.json'
import { useQuery } from './ContextProvider'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// NOT USED ------------------------------------------------------------------------
export default function Splash() {
    const { query, changeQuery } = useQuery()

    function handleClick(val) {
        changeQuery(val)
    }

    const songInfo = coverdata.map((item, idx) => {
        return (
            <div key={idx} className={query === item.name ? 'active coverBt' : 'coverBt'} onClick={() => {handleClick(item.name)}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/${item.cover}.jpg`} />
                {item.name} {item.year !== '' && `(${item.year})`} 
            </div>
        )
    })

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
            responsive: [
            {breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {breakpoint: 480,
                settings: 'unslick'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    };

    return (
        <div className='splash'>
            <Slider {...settings}>
                {songInfo}
            </Slider>
        </div>
    )
}
