import 'regenerator-runtime/runtime'
import Fuse from "fuse.js";

const getData = async () => {
    const response = await fetch("/search.json");
    const data = await response.json();

    const fuse = new Fuse(data, {
        threshold: 0.2,
        keys: [
        {
            name: "name",
            weight: 0.3,
        },
        {
            name: "category",
            weight: 0.2,
        },
        {
            name: "heading",
            weight: 0.1,
        },
        ],
    });

    const search = document.querySelector('[data-search]')
    const source = document.querySelector('[data-search="source"]')
    const output = document.querySelector('[data-search="output"')
    source.disabled = false;

    const removeResults = (event) => {
        if (event && event.relatedTarget && event.relatedTarget.getAttribute('data-search') === 'link') return;
        output.classList.remove('search_preview__open')
    };

    const createResults = (value) => {
        output.classList.add('search_preview__open')
        const results = fuse.search(value);

        if (!results || results.length < 1) {
            output.innerHTML = `No results`
            return
        };

        const groups = results.slice(0, 8).reduce((result, { item: { category, ...rest } } ) => ({
            ...result,
            [category]: [
            ...(result[category] || []),
            rest,
        ]
        }), {})

        const html = `
            ${Object.keys(groups).map(key => `
                <div class="search_category">${key.replace(new RegExp(value, 'gi'), (innerValue) => `<em class="search_highlight">${innerValue}</em>`)}</div>

                ${groups[key].map(({ name, heading, slug }) => {
                if (!name || !heading) return '';

                return `
                    <a href="${slug}" class="search_item" data-search="link"> 
                        <div class="search_page">${name.replace(new RegExp(value, 'gi'), (innerValue) => `<em class="search_highlight">${innerValue}</em>`)}</div>
                        <div class="search_heading">${heading.replace(new RegExp(value, 'gi'), (innerValue) => `<em class="search_highlight">${innerValue}</em>`)}</div>
                    </a>
                `
                }).join('')}
            `).join('')}
        `

        output.innerHTML = html;
    }

    source.addEventListener('blur', removeResults)

    source.addEventListener('input', ({ target: { value }}) => {
        if (value.length < 2) return removeResults();
        createResults(value);
    })

    source.addEventListener('focus', ({ target: { value }}) => {
        if (value.length < 2) return removeResults();
        createResults(value);
    })
};

getData();