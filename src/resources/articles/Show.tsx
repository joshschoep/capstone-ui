import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Article from '../../api/Article';
import { Articles } from '../../api/Index';
import Metadata from './Metadata';

export default function ShowArticle() {
    let { id } = useParams() as { id: string };
    const [article, setArticle] = useState({} as Article );
    useEffect(() => {
        Articles.get(parseInt(id)).then(response => {
            setArticle(response.data as Article);
        });
    }, [id]);

    return (
        <article className="news-article">
            <h2>{ article.headline }</h2>
            <Metadata author={article.employee} created_at={article.created_at} />
            <p>{ article.content }</p>
        </article>
    )
    
}