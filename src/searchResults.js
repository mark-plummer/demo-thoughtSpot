import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';
import { configure, hits, highlight, searchBox, pagination, index, refinementList, currentRefinements } from 'instantsearch.js/es/widgets';
import {
    connectHits,
    connectRefinementList,
    connectSearchBox,
    connectConfigure,
    connectQueryRules

} from 'instantsearch.js/es/connectors';
import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'


export function searchResults() {

    const searchClient = algoliasearch('TLHK1V7PB5', 'dddb115ccbe3c50663c25b2a1be02d4e');

    const search = instantsearch({
        indexName: 'crawler_all_versions',
        searchClient,
        routing: true
    });




    function fetchDocs(query) {

        const data = {
            "query": query,
            "queryLanguages": ["en"],
            "attributesForPrediction": ["title", "description", "sections"],
            "nbHits": 1,
            "EXPERIMENTAL_overwriteSnippetSize": 40,
            "EXPERIMENTAL_overwriteHitsPerPage": 50
        };

        const INDEX_NAME = 'crawler_all_versions'
        const APPLICATION_ID = 'TLHK1V7PB5'
        const API_KEY_WITH_ANSWERS_ACL = '8700699370f33b9e2f648400c318252a'

        const URL = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME}/prediction`;
        fetch(URL, {
            method: "POST",
            headers: {
                "X-Algolia-Application-Id": APPLICATION_ID,
                "X-Algolia-API-Key": API_KEY_WITH_ANSWERS_ACL
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((res) => displayResultsDocs(res.hits))
            .catch(console.error);
    }


    function displayResultsDocs(hits) {
        console.log(hits)
        const docsAnswers = document.querySelector('#docsAnswer');
        const placeholder = document.querySelector('.placeholder')
        placeholder.classList.add('hide')
        placeholder.classList.remove('show')
        // placeholder.style.display = 'none'

        docsAnswers.innerHTML = ` <ul class="ais-Hits-list">${hits.map((hit) => `<li 
        class="ais-Hits-item">
        <p class="title">${hit._answer.extractAttribute === "title" ? hit._answer.extract : hit._highlightResult.title.value}</p>
        <p class="thread">${hit._answer.extractAttribute === "description" ? hit._answer.extract : hit._highlightResult.description.value}</p></li>`).join('')}
        
        </ul> `;
    }

    function fetchMarketing(query) {

        const data = {
            "query": query,
            "queryLanguages": ["en"],
            "attributesForPrediction": ["title", "description"],
            "nbHits": 1,
            "EXPERIMENTAL_overwriteSnippetSize": 80,
            "EXPERIMENTAL_overwriteHitsPerPage": 50
        };

        const INDEX_NAME = 'crawler_thoughtspot_marketing'
        const APPLICATION_ID = 'TLHK1V7PB5'
        const API_KEY_WITH_ANSWERS_ACL = '8700699370f33b9e2f648400c318252a'

        const URL = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME}/prediction`;
        fetch(URL, {
            method: "POST",
            headers: {
                "X-Algolia-Application-Id": APPLICATION_ID,
                "X-Algolia-API-Key": API_KEY_WITH_ANSWERS_ACL
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((res) => displayResultsMarketing(res.hits))
            .catch(console.error);
    }

    function displayResultsMarketing(hits) {
        console.log(hits)
        const marketingAnswers = document.querySelector('#marketingAnswer');
        const placeholder = document.querySelector('.placeholder')
        placeholder.classList.add('hide')
        placeholder.classList.remove('show')
        // placeholder.style.display = 'none'

        marketingAnswers.innerHTML = ` <ul class="ais-Hits-list">${hits.map((hit) => `<li class="ais-Hits-item"><a href="./SearchResults.html">
        <p class="title">${hit._answer.extractAttribute === "title" ? hit._answer.extract : hit._highlightResult.title.value}</p>
        <p class="thread">${hit._answer.extractAttribute === "description" ? hit._answer.extract : hit._highlightResult.description.value}</p>
        </a></li>`).join('')}

        </ul> `;
    }

    function fetchArticles(query) {

        const data = {
            "query": query,
            "queryLanguages": ["en"],
            "attributesForPrediction": ["title", "description"],
            "nbHits": 1,
            "EXPERIMENTAL_overwriteSnippetSize": 80,
            "EXPERIMENTAL_overwriteHitsPerPage": 50
        };

        const INDEX_NAME = 'crawler_thoughtspot_university'
        const APPLICATION_ID = 'TLHK1V7PB5'
        const API_KEY_WITH_ANSWERS_ACL = '8700699370f33b9e2f648400c318252a'

        const URL = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME}/prediction`;
        fetch(URL, {
            method: "POST",
            headers: {
                "X-Algolia-Application-Id": APPLICATION_ID,
                "X-Algolia-API-Key": API_KEY_WITH_ANSWERS_ACL
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((res) => displayResultsrticles(res.hits))
            .catch(console.error);
    }

    function displayResultsrticles(hits) {
        console.log(hits)
        const artcilesAnswers = document.querySelector('#articlesAnswer');
        const placeholder = document.querySelector('.placeholder')
        placeholder.classList.add('hide')
        placeholder.classList.remove('show')
        // placeholder.style.display = 'none'

        artcilesAnswers.innerHTML = ` <ul class="ais-Hits-list">${hits.map((hit) => `<li class="ais-Hits-item">

        <p class="title">${hit._answer.extractAttribute === "title" ? hit._answer.extract : hit._highlightResult.title.value}</p>
        <p class="thread">${hit._answer.extractAttribute === "description" ? hit._answer.extract : hit._highlightResult.description.value}</p></li>`).join('')}

        </ul> `;
    }

    // function fetchForum(query) {

    //     const data = {
    //         "query": query,
    //         "queryLanguages": ["en"],
    //         "attributesForPrediction": ["title", "threadContent", "breadcrumb"],
    //         "nbHits": 1,
    //         "EXPERIMENTAL_overwriteSnippetSize": 80,
    //         "EXPERIMENTAL_overwriteHitsPerPage": 50
    //     };

    //     const INDEX_NAME = 'crawler_citrix_forums_digital_workspace'
    //     const APPLICATION_ID = 'TLHK1V7PB5'
    //     const API_KEY_WITH_ANSWERS_ACL = '8700699370f33b9e2f648400c318252a'

    //     const URL = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME}/prediction`;
    //     fetch(URL, {
    //         method: "POST",
    //         headers: {
    //             "X-Algolia-Application-Id": APPLICATION_ID,
    //             "X-Algolia-API-Key": API_KEY_WITH_ANSWERS_ACL
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then((response) => response.json())
    //         .then((res) => displayResultsforum(res.hits))
    //         .catch(console.error);
    // }

    // function displayResultsforum(hits) {
    //     console.log(hits)
    //     const forumAnswers = document.querySelector('#forumAnswers');
    //     const placeholder = document.querySelector('.placeholder')
    //     placeholder.classList.add('hide')
    //     placeholder.classList.remove('show')
    //     // placeholder.style.display = 'none'

    //     forumAnswers.innerHTML = ` <ul class="ais-Hits-list">${hits.map((hit) => `<li class="ais-Hits-item">
    //     <div class="dateComment-wrapper">
    //       <p><i class="fas fa-comments"></i>${formatComment(hit.replyCount)}</p>
    //       <p><i class="far fa-clock"></i> ${formatDate(hit.createdDate)}</p> 
    //       <p><i class="fas fa-sort-up"></i> ${hit.upvoteCount}</p>
    //     </div>
    //     <p class="title">${hit._answer.extractAttribute === "title" ? hit._answer.extract : hit._highlightResult.title.value}</p>
    //     <p class="thread">${hit._answer.extractAttribute === "threadContent" ? hit._answer.extract : hit._highlightResult.threadContent.value}</p></li>`).join('')}

    //     </ul> `;
    // }

    const renderQueryRuleCustomData = (renderOptions, isFirstRender) => {
        const { items, widgetParams, refine } = renderOptions;



        const checkBanner = items.map(item => {
            return item.banner
        })

        if (!checkBanner.includes(undefined)) {
            let banner = widgetParams.container
            banner.style.display = "block"
            widgetParams.container.innerHTML = `
            
              ${items
                    .map(
                        item =>
                            `
                            <div class="banner-wrapper-overlay">
                            <div class="banner-overlay"></div>
                            <div class="banner-wrapper">
                           
                            
                            <div class="banner-title--wrapper">
                            <a href="${item.link}">
                                <h3>${item.title}</h3>
                                </a>
                                <div class="underline-bannerTitle"></div>
                            </div>
                           
                            <img src="${item.banner}">
                            </div>
                            </div>
                        `
                    )
                    .join('')}
           
          `;
        } else {
            let banner = widgetParams.container
            banner.style.display = "none"
        }
    };

    const customQueryRuleCustomData = connectQueryRules(
        renderQueryRuleCustomData
    );

    const renderConfigure = (renderOptions, isFirstRender) => {
        const { refine } = renderOptions;
    };

    const customConfigure = connectConfigure(
        renderConfigure
    );


    search.addWidgets([
        searchBox({
            container: '#searchbox',
        }),
        customQueryRuleCustomData({
            container: document.querySelector('#banner'),
        }),
        index({
            indexName: 'crawler_thoughtspot_university',
            indexId: 'articles',
        }).addWidgets([
            customConfigure({
                container: document.querySelector('#configure'),
                searchParameters: {
                    hitsPerPage: 5,
                },
            }),
            refinementList({
                container: '#headers',
                attribute: 'articleType',
                limit: 10,
                showMore: true,
                showMoreLimit: 30,
                searchable: true,
            }),
            currentRefinements({
                container: '#current-refinements',
            }),
            hits({
                container: '#articles',
                templates: {
                    item: hit => `
                    
                  <p class="title">${hit._highlightResult.title.value}</p>
                  <p class="thread">${hit._highlightResult.description.value}</p>

        `,
                },
            }),
            pagination({
                container: '#paginationArticles',
            })
        ]),
        index({
            indexName: 'crawler_all_versions',
            indexId: 'docs',
        }).addWidgets([
            customConfigure({
                container: document.querySelector('#docs'),
                searchParameters: {
                    hitsPerPage: 5,
                },
            }),
            refinementList({
                container: '#refinement-list',
                attribute: 'version',
                limit: 10,
                showMore: true,
                showMoreLimit: 30,
                searchable: true,
            }),
            refinementList({
                container: '#hearderDoc',
                attribute: 'headers',
                limit: 10,
                showMore: true,
                showMoreLimit: 30,
                searchable: true,
            }),
            currentRefinements({
                container: '#current-refinements',
            }),
            hits({
                container: '#docs',
                templates: {
                    item: hit => `
                  <p class="version">${hit.version}</p>
                  <p class="title">${hit._highlightResult.title.value}</p>
                  <p class="thread">${hit._highlightResult.description.value}</p>

        `,
                },
            }),
            pagination({
                container: '#paginationDocs',
            })
        ]),
        // index({
        //     indexName: 'crawler_citrix_forums_digital_workspace',
        //     indexId: 'forum',
        // }).addWidgets([
        //     customConfigure({
        //         container: document.querySelector('#forum'),
        //         searchParameters: {
        //             hitsPerPage: 5,
        //         },
        //     }),
        //     currentRefinements({
        //         container: '#current-refinements',
        //     }),
        //     hits({
        //         container: '#forum',
        //         templates: {
        //             item: hit => `
        //     <div class="dateComment-wrapper">
        //           <p><i class="fas fa-comments"></i>${formatComment(hit.replyCount)}</p>
        //             <p><i class="far fa-clock"></i> ${formatDate(hit.createdDate)}</p> 
        //             <p><i class="fas fa-sort-up"></i> ${hit.upvoteCount}</p>
        //           </div>
        //           <p class="title">${hit._highlightResult.title.value}</p>
        //           <p class="thread">${hit._highlightResult.threadContent.value}</p>

        // `,
        //         },
        //     }),
        //     pagination({
        //         container: '#paginationForum',
        //     })

        index({
            indexName: 'crawler_thoughtspot_marketing',
            indexId: 'marketing',
        }).addWidgets([
            customConfigure({
                container: document.querySelector('#marketing'),
                searchParameters: {
                    hitsPerPage: 5,
                },
            }),
            currentRefinements({
                container: '#current-refinements',
            }),
            refinementList({
                container: '#headers',
                attribute: 'headers',
                limit: 10,
                showMore: true,
                showMoreLimit: 30,
                searchable: true,
            }),
            hits({
                container: '#marketing',
                templates: {
                    item: hit => `
                    <a href="./SearchResults.html">
                    <p class="title">${hit._highlightResult.title.value}</p>
                    <p class="thread">${hit._highlightResult.description.value}</p>
                    </a>
        `,
                },
            }),
            pagination({
                container: '#paginationMarketing',
            })
        ])
    ]);

    function formatDate(createdDate) {
        let date = fromUnixTime(createdDate)
        let finalDate = format(date, 'MM/dd/yyyy')
        return finalDate
    }

    // function formatComment(comment) {
    //     if (comment !== null) {
    //         return ` ${comment} `
    //     } else {
    //         return " no comment yet"
    //     }

    // }
    function displayTags(headings) {
        // console.log(headings)
        // let i
        return headings

        // for (i = 0; i < headings.length; i++) {
        //     console.log(headings[i])
        //     return `<li>${headings[i]}</li>`
        // }
        // headings.map(i => {
        //     console.log(i)
        //     return i
        // })

    }


    search.start()
    let searchbox = document.querySelector('.ais-SearchBox-form')
    const answersWrapper = document.querySelector('.answers-wrapper')
    const close = document.querySelector('.searchbox .ais-SearchBox-resetIcon')
    const placeholder = document.querySelector('.placeholder')
    const resultWrapper = document.querySelector('.results-wrapper')
    const answersBtn = document.querySelector('.navAnswers')


    // searchbox.addEventListener('keyup', (e) => {
    //     let query = input.value
    //     fetchDocs(query)
    //     fetchArticles(query)
    //     fetchForum(query)
    //     fetchMarketing(query)
    // })


    let timer,
        timeoutVal = 1000;

    console.log(searchbox.value)
    searchbox.addEventListener('keypress', handleKeyPress);
    searchbox.addEventListener('keyup', handleKeyUp);

    close.addEventListener('click', handleNoQuery)

    function handleNoQuery(e) {
        resultWrapper.classList.remove('movedown')
        answersWrapper.classList.add('hide')
        answersWrapper.classList.remove('show')
        answersBtn.classList.remove('active')

    }



    function handleKeyUp(e) {
        window.clearTimeout(timer);
        let query = e.target.value
        console.log(query)
        if (!answersWrapper.classList.contains('show')) {
            resultWrapper.classList.add('movedown')
            placeholder.classList.add('show')
            placeholder.style.display = 'flex'
            placeholder.classList.remove('hide')
        }
        timer = window.setTimeout(() => {
            if (query !== "") {
                fetchDocs(query)
                fetchArticles(query)
                // fetchForum(query)
                fetchMarketing(query)
                answersWrapper.classList.add('show')
                answersWrapper.classList.remove('hide')
            } else if (query === "") {
                answersWrapper.classList.remove('show')
                answersWrapper.classList.add('hide')
                placeholder.classList.remove('show')
                resultWrapper.classList.remove('movedown')
                // placeholder.style.display = 'none'
                placeholder.classList.add('hide')

            }
        }, timeoutVal);
    }

    function handleKeyPress(e) {
        window.clearTimeout(timer);
    }

    answersBtn.addEventListener('click', (e) => {
        console.log(e)
        if (answersWrapper.classList.contains('hide')) {
            resultWrapper.classList.add('movedown')
            answersWrapper.classList.add('show')
            answersBtn.classList.add('active')
            answersWrapper.classList.remove('hide')
        } else {
            answersBtn.classList.remove('active')
            answersWrapper.classList.remove('show')
            answersWrapper.classList.add('hide')
            resultWrapper.classList.remove('movedown')
        }
    })

}



