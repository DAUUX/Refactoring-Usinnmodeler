import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './style.css'

export function Toast(status, text) {

    const MySwal = withReactContent(Swal)

    let bgColors = {
        'success': '#4ECB7112',
        'error': '#EA5B5B0D'
    }

    let colors = {
        'success': '#4ECB71',
        'error': '#EA5B5B'
    }
    
    MySwal.fire({
        icon: status,
        showCloseButton: true,
        toast: true,
        html: text,
        color: colors[status],
        background: bgColors[status],
        position: 'top',
        showConfirmButton: false,
        timer: 0,
        timerProgressBar: true,
        customClass: {
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
