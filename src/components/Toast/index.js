import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './style.css'

export function Toast(status, text) {

    const MySwal = withReactContent(Swal)

    let bgColors = {
        'success': '#1bc47d',
        'error': '#ff5757',
        'warning': '#ffed7a'
    }
    
    MySwal.fire({
        toast: true,
        html: text,
        color: '#fff',
        background: bgColors[status],
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'toast-popup',
            htmlContainer: 'toast-content'
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            toast.addEventListener('click', Swal.close)
        }
    })
}
