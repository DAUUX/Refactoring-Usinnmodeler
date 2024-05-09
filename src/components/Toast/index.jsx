import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './style.css'

export function Toast(status, text, icons) {

    const MySwal = withReactContent(Swal)

    let bgColors = {
        'success': '#007D32',
        'error': '#AA1010'
    }

    let colors = {
        'success': '#FFFFFF',
        'error': '#FFFFFF'
    }
    
    MySwal.fire({
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
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            toast.addEventListener('click', Swal.close)
        }
    })
}
