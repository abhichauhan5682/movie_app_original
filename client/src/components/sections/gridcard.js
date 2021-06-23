import React from 'react'
import {  Col } from 'antd';
import { IMAGE_URL } from '../../config/default';
import { Tooltip } from 'antd';
import {Link } from 'react-router-dom';

function GridCard(props) {
    let { actor, key, image, movieId, movieName, characterName } = props
    const POSTER_SIZE = "w154";
    if (actor) {
        return (
            <Col key={key} lg={6} md={8} sm={12} xs={24}>
                <Tooltip title={characterName}>
                    <div style={{ position: 'relative' }}>
                        <img style={{ width: '100%', height: '320px' }} alt={characterName} src={`${IMAGE_URL}${POSTER_SIZE}${image}`} />
                    </div>
                </Tooltip>
            </Col>
        )
    } else {
        return (
            <Col key={key} lg={6} md={8} sm={12} xs={24}>
                <div style={{ position: 'relative' }}>
                    <Link to={`/movie/${movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} alt={movieName} src={image} />
                    </Link>
                </div>
            </Col>
        )
    }

}

export default GridCard;