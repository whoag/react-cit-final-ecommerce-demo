import React from 'react'

export default function Container(props){
    return (
        <div
            className={`px-8 pb-12 min-h-screen grid grid-cols-1 grid-rows-auto ${
                props.className ? props.className : ""
            }`}>
            {props.children}
        </div>
    );
}