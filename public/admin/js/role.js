// Delete Role
const buttonsDelete = document.querySelectorAll('[data-btn-delete]');
if (buttonsDelete.length > 0) {
    const formDeleteRole= document.querySelector('#form-delete-role');
    const path = formDeleteRole.getAttribute('data-path');
    
    buttonsDelete.forEach(button => {
        button.addEventListener('click', (e) => {
            const isConfirmed = confirm('Bạn có chắc chắn muốn xóa nhóm quyền này không?');
            if (isConfirmed) {
                const id = button.getAttribute('data-id');

                const action = `${path}/${id}?_method=DELETE`;
                formDeleteRole.action = action;
                formDeleteRole.submit();
            }  
        });
    });    
}
// End Delete Role