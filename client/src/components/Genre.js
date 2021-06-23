import React,{useEffect,useState}from 'react'
import { Menu, Dropdown } from 'antd';
import axios from 'axios';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {API_KEY,API_URL} from '../config/default';


const Helper = (props) => {
    const [Genre,setGenre]=useState([]);
    useEffect(()=>{
        fetch(`${API_URL}genre/movie/list?api_key=${API_KEY}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            setGenre(res.genres);
        })
    },[])
    const menu=(
        <Menu>
            {
                Genre && Genre.map((g,i)=>
                    <Menu.Item key={i} >
                        <a href={`/genre/${g.id}`}>{g.name}</a>
                    </Menu.Item>
                )
            }
        </Menu>
    )
    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Genre <DownOutlined />
            </a>
        </Dropdown>
    )
}

export default Helper;
