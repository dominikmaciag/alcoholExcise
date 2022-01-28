const dtNow = new Date();

function setup() {
    for (var i = 0; i < 3; i++) {
        if (document.getElementById("cb_c" + i).checked) {
            initForm(i);
            enableForm(i);
            document.getElementById("sect_c" + i).style.display = "block";
        } else {
            clearForm(i);
            disableForm(i);
            document.getElementById("sect_c" + i).style.display = "none";
        }

    }
}

function disableForm(n) {
    document.getElementById("incomeVal_c" + n).disabled = true;
    document.getElementById("begDate_c" + n).disabled = true;
    document.getElementById("endDate_c" + n).disabled = true;
}

function enableForm(n) {
    document.getElementById("incomeVal_c" + n).disabled = false;
    document.getElementById("begDate_c" + n).disabled = false;
    document.getElementById("endDate_c" + n).disabled = false;
}


function clearForm(n) {
    document.getElementById("incomeVal_c" + n).value = '';
    document.getElementById("begDate_c" + n).value = '';
    document.getElementById("endDate_c" + n).value = '';
}


function initForm(n) {
    if (document.getElementById("incomeVal_c" + n).value == '') {
        document.getElementById("incomeVal_c" + n).value = 0;
    }
    if (document.getElementById("begDate_c" + n).value == '') {
        document.getElementById("begDate_c" + n).value = dtNow.getFullYear() + "-01-01";
    }
    if (document.getElementById("endDate_c" + n).value == '') {
        document.getElementById("endDate_c" + n).value = dtNow.getFullYear() + "-12-31";
    }
}


function openForm(n) {
    var cb = document.getElementById('cb_c' + n);
    if (cb.checked) {
        initForm(n);
        enableForm(n);
        $("#sect_c" + n).slideDown(400, '');
    } else {
        clearForm(n);
        disableForm(n);
        $("#sect_c" + n).slideUp(400, '');
    }
}