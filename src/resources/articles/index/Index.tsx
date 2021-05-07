import React from 'react';
import styles from './Index.module.scss';
import { Link } from 'react-router-dom';
import { ArticlePage } from '../../../api/Article';
import Subtitle from '../subtitle/Subtitle';

export default function ArticlesIndex(props: {articles: ArticlePage}) {
    return (
        <ul className={styles.articles_list}>
            { props.articles.data && props.articles.data.map(article => {
                return (
                    <li key={article.id} className={styles.news_article}>
                        <Link to={`articles/${article.id}`}>
                            <h2>{ article.headline }</h2>
                            <Subtitle author={article.user} created_at={article.created_at} />
                            { 
                                article.thumbnail_url &&
                                <img 
                                    alt="Article Thumbnail"
                                    className={`${styles.thumbnail} 
                                    ${article.thumbnail_inline_location === "before" 
                                        ? styles.thumbnail_before 
                                        : styles.thumbnail_after}`
                                    } 
                                    src={article.thumbnail_url} width={150} 
                                /> 
                            }
                            <p className={styles.content}>
                                { article.content }
                            </p>
                        </Link>
                    </li>
                )
            }) } 
        </ul>
    )
}