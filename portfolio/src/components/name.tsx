import React from 'react';
import { motion } from 'framer-motion';
import './name.css';

class NameProps
{
    name:string = "";
}

export function Name(props:NameProps){
    const name = props.name.split('');
    const charElms = name.map((c:string)=>{
        return <motion.h1 className='char'>{c}</motion.h1>
    })
    return (<div>{charElms}</div>)
}