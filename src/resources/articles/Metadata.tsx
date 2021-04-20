import Employee from "../../api/Employee";
import React from 'react';

export default function Metadata(props: {author?: Employee, created_at?: number}) {
    return (
        <div className="article-metadata">
            { props.author && <img height="25px" width="25px" className="avatar-small" />}
            <div>
                <p className="article-author">{ props.author && `${props.author.first_name} ${props.author.last_name}` }</p>
                <small className="article-date">{ props.created_at || "" }</small>
            </div>
        </div>
    )
}