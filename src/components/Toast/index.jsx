import Swal from 'sweetalert2'
import './style.css'

export function Toast(status, text, icons) {

    let bgColors = {
        'success': '#00672E',
        'error': '#AA1010'
    }

    let colors = {
        'success': '#FFFFFF',
        'error': '#FFFFFF'
    }
    
    Swal.fire({
        iconHtml: `<span class="${icons}"></span>`,
        showCloseButton: true,
        toast: true,
        html: text,
        color: colors[status],
        background: bgColors[status],
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        customClass: {
            icon: 'no-border',
            container: 'toast-container',
            popup: 'toast-popup',
            htmlContainer: 'toast-content',
            closeButton: 'toast-close',
            timerProgressBar: 'toast-progressbar',
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            toast.addEventListener('click', Swal.close)

            //Removendo o que não está sendo utilizado, para remover alertas no console
            toast.querySelectorAll('input').forEach(input => input.remove());
            toast.querySelectorAll('label').forEach(label => label.remove());
            toast.querySelectorAll('textarea').forEach(textarea => textarea.remove());
            toast.querySelectorAll('select').forEach(select => select.remove());
        }
    })
}
