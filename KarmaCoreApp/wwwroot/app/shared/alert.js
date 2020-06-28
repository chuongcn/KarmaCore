class Alert {
    static showDeleteConfirm(okCallback) {
        Swal.fire({
            type: 'warning',
            title: 'Are you sure?',
            text: "Do you want to delete?",
            confirmButtonColor: "#dc3545",
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
        });
    }

    static showConfirm(msg, okCallback) {
        Swal.fire({
            type: 'warning',
            title: 'Are you sure?',
            text: msg,
            confirmButtonColor: "#dc3545",
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
        });
    }

    static showConfirm(msg, okCallback, cancelCallback) {
        Swal.fire({
            type: 'warning',
            title: 'Are you sure?',
            text: msg,
            confirmButtonColor: "#dc3545",
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                okCallback();
            } else {
                cancelCallback();
            }
        });
    }

    static showConfirmWithHtmlMsg(htmlMsg, okCallback) {
        Swal.fire({
            type: 'warning',
            title: 'Are you sure?',
            html: htmlMsg,
            confirmButtonColor: "#dc3545",
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
        });
    }
}