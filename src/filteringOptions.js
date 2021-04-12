export function filteringOptions() {


    // GET

    let docsBtn = document.querySelector('.navDocs')
    let forumBtn = document.querySelector('.navForum')
    let articlesBtn = document.querySelector('.navArticles')
    let MarketingBtn = document.querySelector('.navMarketing')

    // let articleType = document.querySelector('.articleType-filter')
    let productFilter = document.querySelector('.product-filter')
    let applicableProductFilter = document.querySelector('.applicableProduct-filter')
    // let articleCategoryFilter = document.querySelector('.articleCategory-filter')
    let headersFilter = document.querySelector('.headers-filter')

    let articleResult = document.querySelector('.article-result')
    let docsResult = document.querySelector('.docs-result')
    // let forumResult = document.querySelector('.forum-result')
    let marketingResult = document.querySelector('.marketing-result')


    // EVENT

    docsBtn.addEventListener('click', docs)
    // forumBtn.addEventListener('click', forum)
    articlesBtn.addEventListener('click', articles)
    articlesBtn.addEventListener('click', articles)
    MarketingBtn.addEventListener('click', marketing)

    // FUNCTION

    function docs(e) {
        console.log(e)
        if (!docsBtn.classList.contains('active')) {
            docsBtn.classList.add('active')
            docsResult.classList.remove('hide')
            productFilter.classList.remove('hide')
            if (!articlesBtn.classList.contains('active')) {
                // articleType.classList.add('hide')
                applicableProductFilter.classList.add('hide')
                // articleCategoryFilter.classList.add('hide')
                articleResult.classList.add('hide')
                headersFilter.classList.add('hide')
            }
            if (!marketingResult.classList.contains('active')) {
                marketingResult.classList.add('hide')
            }

        } else {
            docsBtn.classList.remove('active')
            // articleType.classList.remove('hide')
            applicableProductFilter.classList.remove('hide')
            // articleCategoryFilter.classList.remove('hide')
            articleResult.classList.remove('hide')
            // forumResult.classList.remove('hide')
            headersFilter.classList.remove('hide')
        }
    }
    // function forum(e) {
    //     console.log(e)
    //     if (!forumBtn.classList.contains('active')) {
    //         if (!articlesBtn.classList.contains('active')) {
    //             // articleType.classList.add('hide')
    //             applicableProductFilter.classList.add('hide')
    //             // articleCategoryFilter.classList.add('hide')
    //             articleResult.classList.add('hide')
    //         }
    //         if (!docsBtn.classList.contains('active')) {
    //             docsResult.classList.add('hide')
    //             productFilter.classList.add('hide')
    //         }
    //         if (!MarketingBtn.classList.contains('active')) {
    //             marketingResult.classList.add('hide')
    //             headersFilter.classList.add('hide')
    //         }
    //         forumBtn.classList.add('active')
    // forumResult.classList.remove('hide')

    //     } else {
    //         forumBtn.classList.remove('active')
    //         // articleType.classList.remove('hide')
    //         productFilter.classList.remove('hide')
    //         applicableProductFilter.classList.remove('hide')
    //         // articleCategoryFilter.classList.remove('hide')
    //         articleResult.classList.remove('hide')
    //         docsResult.classList.remove('hide')
    //         headersFilter.classList.remove('hide')
    //     }
    // }
    function articles(e) {
        if (!articlesBtn.classList.contains('active')) {
            if (!docsBtn.classList.contains('active')) {
                docsResult.classList.add('hide')
                productFilter.classList.add('hide')
            }
            // if (!forumBtn.classList.contains('active')) {
            //     forumResult.classList.add('hide')
            // }
            if (!MarketingBtn.classList.contains('active')) {
                marketingResult.classList.add('hide')
                headersFilter.classList.add('hide')
            }
            articlesBtn.classList.add('active')
            applicableProductFilter.classList.remove('hide')
            // articleCategoryFilter.classList.remove('hide')
            articleResult.classList.remove('hide')
            // articleType.classList.remove('hide')



        } else {
            articlesBtn.classList.remove('active')
            // forumResult.classList.remove('hide')
            productFilter.classList.remove('hide')
            docsResult.classList.remove('hide')
            headersFilter.classList.remove('hide')
        }
    }

    function marketing(e) {
        console.log(e)
        if (!MarketingBtn.classList.contains('active')) {
            if (!articlesBtn.classList.contains('active')) {
                // articleType.classList.add('hide')
                applicableProductFilter.classList.add('hide')
                // articleCategoryFilter.classList.add('hide')
                articleResult.classList.add('hide')
            }
            if (!docsBtn.classList.contains('active')) {
                docsResult.classList.add('hide')
                productFilter.classList.add('hide')
            }
            // if (!forumBtn.classList.contains('active')) {
            //     forumResult.classList.add('hide')
            // }
            MarketingBtn.classList.add('active')
            marketingResult.classList.remove('hide')
            headersFilter.classList.remove('hide')

        } else {
            MarketingBtn.classList.remove('active')
            // articleType.classList.remove('hide')
            productFilter.classList.remove('hide')
            applicableProductFilter.classList.remove('hide')
            // articleCategoryFilter.classList.remove('hide')
            articleResult.classList.remove('hide')
            docsResult.classList.remove('hide')
        }
    }
}