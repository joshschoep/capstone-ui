import React, { useEffect, useState } from 'react';
import styles from './Show.module.scss';
import { ArticlePage } from '../../api/Article';
import { Sections } from '../../api/Index';
import Section from '../../api/Section';
import ArticlesIndex from '../articles/index/Index';
import Paginator from '../../components/paginator/Paginator';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumb';

export default function ShowSections() {
    const [sectionNumber, setSection] = useState(1);
    const [page, setPage] = useState(1);

    const [sections, setSections] = useState([] as Section[]);
    const [articles, setArticles] = useState({} as ArticlePage);

    useEffect(() => {
        Sections.index().then(response => {
            setSections(response.data as Section[]);
        });
    }, []);

    useEffect(() => {
        Sections.articles(sectionNumber, page).then(response => {
            setArticles(response.data as ArticlePage);
        });
    }, [sectionNumber, page]);

    return (
        <div className={styles.sections}>
            <ul className={styles.sections_nav}>
                <h2>SUB HEADER</h2>
                { sections.map(section => {
                    return (
                        <li key={section.id}>
                            <button 
                                onClick={() => {
                                    setSection(section.id);
                                    setPage(1);
                                }}
                                className={sectionNumber === section.id ? styles.active : ""}
                            >
                                { section.title }
                            </button>
                        </li>
                    )
                }) }
            </ul>
            <main>
                <Breadcrumbs crumbs={["NEWS", sections[sectionNumber-1]?.title ]} />
                <ArticlesIndex articles={articles} />
                <Paginator data={articles} setter={setPage} />
            </main>
        </div>
    );
}