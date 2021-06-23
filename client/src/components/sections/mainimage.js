import React from 'react'
import {Typography} from 'antd';


const {Title} =Typography

const MainImage = ({
    image,
    title,
    text
}) => {
    return (
        <div className='landing-inner1' style={{background:`url(${image})`}}>
            <div>
                <div className='landing-bottom1'>
                <Title className='title1' level={2}>{title}</Title>
                <p className='landing-p1'>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default MainImage
