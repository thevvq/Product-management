// Change Status
const buttonsChangeStatus = document.querySelectorAll('[data-btn-change-status]');
if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.getElementById('form-change-status');
    const path = formChangeStatus.getAttribute('data-path');

    buttonsChangeStatus.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const id = button.getAttribute('data-id');
            const currentStatus = button.getAttribute('data-status');
            const newStatus = currentStatus == 'active' ? 'inactive' : 'active';

            formChangeStatus.action = `${path}/${newStatus}/${id}?_method=PATCH`;
            formChangeStatus.submit();
        });
    });
}

//End Change Status