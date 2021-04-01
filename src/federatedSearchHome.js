import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';
import {
  configure,
  hits,
  highlight,
  searchBox,
  pagination,
  index,
} from 'instantsearch.js/es/widgets';

import {
  connectHits,
  connectRefinementList,
  connectSearchBox,
  connectConfigure,
} from 'instantsearch.js/es/connectors';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

export function federatedSearchHome() {
  /* global algoliasearch instantsearch */

  const searchClient = algoliasearch(
    'TLHK1V7PB5',
    'dddb115ccbe3c50663c25b2a1be02d4e'
  );

  const search = instantsearch({
    indexName: 'crawler_all_versions',
    searchClient,
    routing: true,
  });

  function fetchAnswsers(query) {
    const dataDocs = {
      "query": query,
      "queryLanguages": ['en'],
      "attributesForPrediction": ['title', 'description', 'sections'],
      "nbHits": 1,
      "EXPERIMENTAL_overwriteSnippetSize": 40,
      "EXPERIMENTAL_overwriteHitsPerPage": 50
    };

    const dataArticle = {
      "query": query,
      "queryLanguages": ['en'],
      "attributesForPrediction": ['title', 'description', 'articleCategory'],
      "nbHits": 1,
      "EXPERIMENTAL_overwriteSnippetSize": 40,
      "EXPERIMENTAL_overwriteHitsPerPage": 50
    };

    // const dataForum = {
    //   "query": query,
    //   "queryLanguages": ['en'],
    //   "attributesForPrediction": ['title', 'threadContent', 'breadcrumb'],
    //   "nbHits": 1,
    //   "EXPERIMENTAL_overwriteSnippetSize": 40,
    //   "EXPERIMENTAL_overwriteHitsPerPage": 50

    // };
    const dataMarketing = {
      "query": query,
      "queryLanguages": ['en'],
      "attributesForPrediction": ['title', 'description'],
      "nbHits": 1,
      "EXPERIMENTAL_overwriteSnippetSize": 80,
      "EXPERIMENTAL_overwriteHitsPerPage": 50

    };

    const INDEX_NAME_DOC = 'crawler_all_versions';
    const INDEX_NAME_ART = 'crawler_thoughtspot_university';
    // const INDEX_NAME_FORUM = 'crawler_citrix_forums_digital_workspace';
    const INDEX_NAME_MARK = 'crawler_thoughtspot_marketing';
    const APPLICATION_ID = 'TLHK1V7PB5';
    const API_KEY_WITH_ANSWERS_ACL = '8700699370f33b9e2f648400c318252a';

    function fetchDocJSON() {
      return new Promise(async (resolve, reject) => {
        try {
          const URLDOC = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME_DOC}/prediction`;
          const response = await fetch(URLDOC, {
            method: 'POST',
            headers: {
              'X-Algolia-Application-Id': APPLICATION_ID,
              'X-Algolia-API-Key': API_KEY_WITH_ANSWERS_ACL,
            },
            body: JSON.stringify(dataDocs),
          });
          const res = await response.json();
          resolve(res.hits);
        } catch (e) {
          console.log(e)
          reject(e);
        }
      });
    }
    function fetchMarketingJSON() {
      return new Promise(async (resolve, reject) => {
        try {
          const URLDOC = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME_MARK}/prediction`;
          const response = await fetch(URLDOC, {
            method: 'POST',
            headers: {
              'X-Algolia-Application-Id': APPLICATION_ID,
              'X-Algolia-API-Key': API_KEY_WITH_ANSWERS_ACL,
            },
            body: JSON.stringify(dataMarketing),
          });
          const res = await response.json();
          resolve(res.hits);
        } catch (e) {
          console.log(e)
          reject(e);
        }
      });
    }

    function fetchArtJSON() {
      return new Promise(async (resolve, reject) => {
        try {
          const URLART = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME_ART}/prediction`;
          const response = await fetch(URLART, {
            method: 'POST',
            headers: {
              'X-Algolia-Application-Id': APPLICATION_ID,
              'X-Algolia-API-Key': API_KEY_WITH_ANSWERS_ACL,
            },
            body: JSON.stringify(dataArticle),
          });
          const res = await response.json();
          resolve(res.hits);
        } catch (e) {
          console.log(e)
          reject(e);
        }
      });
    }

    // function fetchForumJSON() {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const URLFORUM = `https://${APPLICATION_ID}-2.algolia.net/1/answers/${INDEX_NAME_FORUM}/prediction`;
    //       const response = await fetch(URLFORUM, {
    //         method: 'POST',
    //         headers: {
    //           'X-Algolia-Application-Id': APPLICATION_ID,
    //           'X-Algolia-API-Key': API_KEY_WITH_ANSWERS_ACL,
    //         },
    //         body: JSON.stringify(dataForum),
    //       });
    //       const res = await response.json();
    //       resolve(res.hits);
    //     } catch (e) {
    //       console.log(e)
    //       reject(e);
    //     }
    //   });
    // }


    Promise.all([fetchDocJSON(), fetchArtJSON(), fetchMarketingJSON()]).then(
      values => {
        displayAll(values)
      }
    );

    function displayAll(values) {

      console.log(values[0], values[1], values[2])
      if (values.length >= 1) {
        let docScore = values[0][0] ? values[0][0]._answer.score : 0
        let articleScore = values[1][0] ? values[1][0]._answer.score : 0
        // let forumScore = values[2][0] ? values[2][0]._answer.score : 0
        let marketingScore = values[2][0] ? values[2][0]._answer.score : 0
        let answers = document.querySelector('.answers')
        const answersWrapper = document.querySelector('.answers-wrapper')
        const placeholder = document.querySelector('.placeholder')

        const index = document.querySelector('.indexes')
        answersWrapper.classList.add('show')
        answersWrapper.classList.remove('hide')
        placeholder.classList.add('hide')
        placeholder.classList.remove('show')
        placeholder.style.display = 'none'




        if (docScore > articleScore && docScore > marketingScore) {
          index.innerHTML = "from our Documentation"
          answers.innerHTML = ` <a href="./SearchResults.html">
        <p class="title">${values[0][0]._answer.extractAttribute === "title" ? values[0][0]._answer.extract : values[0][0]._highlightResult.title.value}</p>
        <p class="thread">${values[0][0]._answer.extractAttribute === "description" ? values[0][0]._answer.extract : values[0][0]._highlightResult.description.value}</p>
        </a>`
        } else if (articleScore > docScore && articleScore > marketingScore) {
          index.innerHTML = "from our Articles"
          answers.innerHTML = ` <a href="./SearchResults.html">
          <p class="title">${values[1][0]._answer.extractAttribute === "title" ? values[1][0]._answer.extract : values[1][0]._highlightResult.title.value}</p>
          <p class="thread">${values[1][0]._answer.extractAttribute === "description" ? values[1][0]._answer.extract : values[1][0]._highlightResult.description.value}</p>
          </a>`
        } else if (marketingScore > docScore && marketingScore > articleScore) {
          index.innerHTML = "from our Marketing Platform"
          answers.innerHTML = `  <a href="./SearchResults.html">
        <p class="title">${values[2][0]._answer.extractAttribute === "title" ? values[2][0]._answer.extract : values[2][0]._highlightResult.title.value}</p>
        <p class="thread">${values[2][0]._answer.extractAttribute === "description" ? values[2][0]._answer.extract : values[2][0]._highlightResult.description.value}</p>
        </a>`
        } else {
          answersWrapper.classList.add('hide')
        }


      }
    }

  }

  // function displayResultsDocs(hits) {
  //   console.log(hits)
  //   const docsAnswers = document.querySelector('#docsAnswer');

  //   //   docsAnswers.innerHTML = ` <ul class="ais-Hits-list">${hits.map((hit) => `<li
  //   // class="ais-Hits-item"><p class="product">${hit._highlightResult.product.value}</p>
  //   // <p class="title">${hit._answer.extract ? hit._answer.extract : hit._highlightResult.title.value}</p>
  //   // <p class="thread">${hit._answer.extract ? hit._answer.extract : hit._highlightResult.information.value}</p></li>`).join('')}

  //   // </ul> `;
  // }

  const renderHits = (renderOptions, isFirstRender) => {
    const { hits } = renderOptions;

    const query =
      search.renderState.crawler_all_versions.searchBox.query;
    const searchBox = document.querySelector('.searchbox .ais-SearchBox-form');

    searchBox.addEventListener('submit', e => {
      e.preventDefault();
      window.location.href = `./SearchResults.html?crawler_all_versions%5Bquery%5D=${query}`;
    });


  };

  const renderConfigure = (renderOptions, isFirstRender) => {
    const { refine } = renderOptions;
  };

  const customConfigure = connectConfigure(renderConfigure);

  const customHits = connectHits(renderHits);

  search.addWidgets([
    searchBox({
      container: '#searchbox',
    }),
    customHits({
      container: document.querySelector('#products'),
    }),

    index({
      indexName: 'crawler_thoughtspot_university',
      indexId: 'articles',
    }).addWidgets([
      customConfigure({
        container: document.querySelector('#configure'),
        searchParameters: {
          hitsPerPage: 3,
        },
      }),
      hits({
        container: '#articles',
        templates: {
          item: hit => ` 
          <a href="./SearchResults.html">
          <p class="title">${hit._highlightResult.title.value}</p>
          <p class="thread">${hit._highlightResult.description.value}</p>
          </a>
           
              `,

          empty: 'Sorry no result in our Articles for <q>{{ query }}</q>',

        },
      }),
    ]),
    index({
      indexName: 'crawler_all_versions',
      indexId: 'docs',
    }).addWidgets([
      customConfigure({
        container: document.querySelector('#docs'),
        searchParameters: {
          hitsPerPage: 3,
        },
      }),
      hits({
        container: '#docs',
        templates: {
          item: hit => ` 
          <a href="./SearchResults.html">
          <p class="version">${hit.version}</p>
          <p class="title">${hit._highlightResult.title.value}</p>
          <p class="thread">${hit._highlightResult.description.value}</p>
          </a>
           
              `,
          empty: 'Sorry no result in our Docs for <q>{{ query }}</q>',
        },
      }),
    ]),
    index({
      indexName: 'crawler_thoughtspot_marketing',
      indexId: 'marketing',
    }).addWidgets([
      customConfigure({
        container: document.querySelector('#marketing'),
        searchParameters: {
          hitsPerPage: 3,
        },
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
          empty: 'Sorry no result in our marketing platform for <q>{{ query }}</q>',
        },
      }),
    ]),
    // index({
    //   indexName: 'crawler_citrix_forums_digital_workspace',
    //   indexId: 'forum',
    // }).addWidgets([
    //   customConfigure({
    //     container: document.querySelector('#forum'),
    //     searchParameters: {
    //       hitsPerPage: 3,
    //     },
    //   }),
    //   hits({
    //     container: '#forum',
    //     templates: {
    //       item: hit => ` 
    //       <a href="./SearchResults.html">
    //       <div class="dateComment-wrapper">
    //       <p><i class="fas fa-comments"></i>${formatComment(hit.replyCount)}</p>
    //         <p><i class="far fa-clock"></i> ${formatDate(hit.createdDate)}</p> 
    //         <p><i class="fas fa-sort-up"></i> ${hit.upvoteCount}</p>
    //       </div>
    //       <p class="title">${hit._highlightResult.title.value}</p>
    //       <p class="thread">${hit._highlightResult.threadContent.value}</p>
    //        </a>
    //           `,
    //       empty: 'Sorry no result in our Forum  for <q>{{ query }}</q>',
    //     },
    //   }),
    // ]),
  ]);

  // function formatDate(createdDate) {
  //   let date = fromUnixTime(createdDate);
  //   let finalDate = format(date, 'MM/dd/yyyy');
  //   return finalDate;
  // }

  // function formatComment(comment) {
  //   if (comment !== null) {
  //     return ` ${comment}`;
  //   } else {
  //     return ' no comment yet';
  //   }
  // }

  search.start();

  const searchbox = document.querySelector('.searchbox .ais-SearchBox-form');
  const answers = document.querySelector('.answers')
  const answersWrapper = document.querySelector('.answers-wrapper')
  const close = document.querySelector('.searchbox .ais-SearchBox-resetIcon')
  const placeholder = document.querySelector('.placeholder')
  let timer,
    timeoutVal = 1000;


  searchbox.addEventListener('keypress', handleKeyPress);
  searchbox.addEventListener('keyup', handleKeyUp);
  close.addEventListener('click', handleNoQuery)

  function handleNoQuery(e) {
    answersWrapper.classList.add('hide')
    answersWrapper.classList.remove('show')
    answers.innerHTML = ""
  }

  function handleKeyUp(e) {
    window.clearTimeout(timer);
    let query = e.target.value
    console.log(query)
    if (!answersWrapper.classList.contains('show')) {
      placeholder.classList.add('show')
      placeholder.style.display = 'flex'
      placeholder.classList.remove('hide')
    }
    timer = window.setTimeout(() => {
      if (query !== "") {
        fetchAnswsers(query)
      } else if (query === "") {
        answersWrapper.classList.remove('show')
        answersWrapper.classList.add('hide')
        answers.innerHTML = ""
        placeholder.classList.remove('show')
        placeholder.style.display = 'none'
        placeholder.classList.add('hide')
      }
    }, timeoutVal);
  }

  function handleKeyPress(e) {
    window.clearTimeout(timer);
  }




}
