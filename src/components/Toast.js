import Swal from "sweetalert2";
import { Box, Snackbar } from '@material-ui/core'

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-center',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const startToast = (type, text) => {
    Toast.fire({
        icon: type,
        title: text
    })
}