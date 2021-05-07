import React from 'react';
import styles from './Paginator.module.scss';
import Pagination from '../../api/Pagination';

export default function Paginator(
    props: {
        data: Pagination, 
        setter: React.Dispatch<React.SetStateAction<any>>
    }
){
    return (
        <div className={styles.pagination}>
            {/* <span>Page {props.data.current_page} of {props.data.last_page} </span> */}
            <button 
                disabled={props.data.prev_page_url === null}
                onClick={() => props.setter(props.data.current_page - 1)}
            >Previous</button>
            <button  
                className={props.data.current_page === 1 ? styles.active : ""}
                disabled={props.data.first_page_url === "" || props.data.current_page === 1}
                onClick={() => props.setter(1)}
            >1</button>
            { props.data.last_page && 
                <button 
                    className={props.data.current_page === props.data.last_page ? styles.active : ""}
                    disabled={props.data.last_page_url === "" || props.data.current_page === props.data.last_page}
                    onClick={() => props.setter(props.data.last_page)}
                >{props.data.last_page}</button> 
            }
            <button 
                disabled={props.data.next_page_url === ""}
                onClick={() => props.setter(props.data.current_page + 1)}
            >Next</button>
        </div>
    );
}