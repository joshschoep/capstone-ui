import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArticlePage } from '../../api/Article';
import { Articles } from '../../api/Index';
import Metadata from './Metadata';

export default function ArticlesIndex() {
    const [articles, setArticles] = useState( {} as ArticlePage )
    useEffect(() => {
        Articles.index().then(response => {
            setArticles( response.data as ArticlePage );
        })
    }, [])
    return (
        <ul className="articles-list">
            { articles.data && articles.data.map(article => {
                return (
                    <li key={article.id} className="news-article">
                        <Link to={`articles/${article.id}`}>
                            <h2>{ article.headline }</h2>
                            <Metadata author={article.employee} created_at={article.created_at} />
                            <p>{ article.short }</p>
                        </Link>
                    </li>
                )
            }) } 
        </ul>
    )
}