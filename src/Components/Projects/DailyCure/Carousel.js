import React from 'react'
import coverdata from './coverart.json'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from './ContextProvider'

export default function Carousel() {
    const { query, changeQuery, forQueryInTitle, forQueryInLyric } = useQuery()

    function handleClick(val) {
        changeQuery(val)
        forQueryInTitle(false)
        forQueryInLyric(false)
    }

    const songInfo = coverdata.map((item, idx) => {
        return (
            <div key={idx} className={query === item.name ? 'active coverBt' : 'coverBt'} onClick={() => {handleClick(item.name)}}>
                <img alt='cover' src={`${process.env.PUBLIC_URL}/img/cure/${item.cover}.jpg`} />
                {item.name} {item.year !== '' && `(${item.year})`} 
            </div>
        )
    })

    // Define base to make it easier to control reduced size.
    // If quesry, show more slides. This reduces image sze
    const toShowBase = query ? 10 : 6;

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: toShowBase,
        slidesToScroll: toShowBase - 4,
            responsive: [
            {breakpoint: 780,
                settings: {
                    slidesToShow: toShowBase - 3,
                    slidesToScroll: toShowBase - 4
                }
            },
            {breakpoint: 320,
                settings: 'unslick'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    };

    return (
        <div className={query ? 'carousel reduced' : 'carousel'}>
            <Slider {...settings}>
                {songInfo}
            </Slider>
        </div>
    )
}
