import React, { useEffect, useState } from 'react';
import styles from './Show.module.scss';
import { useParams } from 'react-router';
import Article from '../../../api/Article';
import { Articles } from '../../../api/Index';
import Subtitle from '../subtitle/Subtitle';
import Breadcrumbs from '../../../components/breadcrumb/Breadcrumb';

export default function ShowArticle() {
    let { id } = useParams() as { id: string };
    const [article, setArticle] = useState({} as Article );
    
    useEffect(() => {
        Articles.get(parseInt(id)).then(response => {
            setArticle(response.data as Article);
        });
    }, [id]);

    let crumbs: string[] = [];
    if(article.section) {
        crumbs = ["NEWS", article.section.title, article.headline];
    }else{
        crumbs = ["NEWS", article.headline];
    }

    return (

        <main>
            <Breadcrumbs crumbs={crumbs} />
            <article className={styles.news_article}>
                <h2 className={styles.article_headline}>{ article.headline }</h2>
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
                <p className={styles.article_content}>{ article.content }</p>
            </article>
        </main>
    )
    
}