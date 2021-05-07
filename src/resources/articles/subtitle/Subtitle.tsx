import User from "../../../api/User";
import styles from './Subtitle.module.scss';
import React from 'react';
import default_avatar from '../../../default_avatar.png';
import { convertUnixToString } from "../../../api/Date";

export default function Subtitle(props: {author?: User, created_at?: number}) {
    return (
        <div className={styles.article_subtitle}>
            { props.author && 
                <img 
                    height="30px" width="30px" 
                    src={ props.author.avatar_uri || default_avatar } 
                    className={ styles.avatar + "avatar-small"} alt="Author Avatar" 
                />
            }
            <div>
                <p className={styles.author}>{ props.author && `${props.author.first_name} ${props.author.last_name}` }</p>
                <small className={styles.article_date}>{ props.created_at ? convertUnixToString(props.created_at) : "" }</small>
            </div>
        </div>
    )
}