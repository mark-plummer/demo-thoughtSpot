export function federatedSearchAnimation() {
    // SELECTORS

    let searchbox = document.querySelector('.searchbox')
    let dropdown = document.querySelector('.federated-wrapper')
    let insidedropdown = document.querySelector('.federated-results-container')

    searchbox.addEventListener('click', (e) => {
        if (dropdown.classList.contains('hidden')) {
            dropdown.classList.remove('hidden')
            dropdown.classList.add('open')
        }
    })

    dropdown.addEventListener('click', (e) => {
        console.log(e.target)
        if (e.target !== dropdown) {
            dropdown.classList.add('hidden')
            dropdown.classList.remove('open')
        }
    })
}