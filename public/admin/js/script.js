// Button status
const btnStatus = document.querySelectorAll('[btn-status]')

if (btnStatus.length > 0){
    btnStatus.forEach(btn => {
        btn.addEventListener('click', () =>{
            let url = new URL(window.location.href)
            const status = btn.getAttribute('btn-status')

            if (status){
                url.searchParams.set('status', status)
            }else{
                url.searchParams.delete('status')
            }

            window.location.href = url.href
        })
    })
}
// End button status

// Form search
const formSearch = document.querySelectorAll('#form-search')

if (formSearch) {
    let url = new URL(window.location.href)
    forEach.formSearch.addEventListener('submit', (e) => {
        e.preventDefault()
        const keyword = e.target.elements.keyword.value

        if (keyword){
            url.searchParams.set('keyword', keyword)
        } else {
            url.searchParams.delete('keyword')
        }
        window.location.href = url.href
    })
}


// End form search
