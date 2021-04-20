import React from 'react';

interface FooterNav {
    label: string,
    links: Array<{ name: string, href: string }>
}

export default function Footer() {
    return (
        <footer>
            <nav>
                { navs.map(nav => {
                    return (
                    <ul key={nav.label}>
                        <h2>{ nav.label }</h2>
                        { nav.links.map(link => {
                            return <li key={link.name}><a href={link.href}>{link.name}</a></li>
                        })}
                    </ul>
                    )
                })}
            </nav>
            <span className="copyright">{ process.env.REACT_APP_COPYRIGHT_STATEMENT }</span>
        </footer>
    )
}

const navs: FooterNav[] = [
    {
        label: "Footer Nav 1",
        links: [
            {name: "Item 1.1", href: "#"},
            {name: "Item 1.2", href: "#"},
            {name: "Item 1.3", href: "#"},
            {name: "Item 1.4", href: "#"},
            {name: "Item 1.5", href: "#"},
            {name: "Item 1.6", href: "#"}
        ]
    },
    {
        label: "Footer nav 2",
        links: [
            {name: "Item 2.1", href: "#"},
            {name: "Item 2.2", href: "#"},
            {name: "Item 2.3", href: "#"}
        ]
    },
    {
        label: "Footer nav 3",
        links: [
            {name: "Item 3.1", href: "#"},
            {name: "Item 3.2", href: "#"},
            {name: "Item 3.3", href: "#"},
            {name: "Item 3.4", href: "#"}
        ]
    },
    {
        label: "Footer nav 4",
        links: [
            {name: "Item 4.1", href: "#"},
            {name: "Item 4.2", href: "#"},
            {name: "Item 4.3", href: "#"},
            {name: "Item 4.4", href: "#"},
            {name: "Item 4.5", href: "#"},
            {name: "Item 4.6", href: "#"}
        ]
    },
    {
        label: "Footer nav 5",
        links: [
            {name: "Item 5.1", href: "#"},
            {name: "Item 5.2", href: "#"}
        ]
    },
]