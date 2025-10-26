function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text);
  Swal.fire({
    icon: 'success',
    title: 'Tersalin!',
    text: message,
    confirmButtonColor: '#ec4899',
    background: '#fff1f2',
    color: '#9d174d',
    timer: 1800,
    showConfirmButton: false
  });
}
