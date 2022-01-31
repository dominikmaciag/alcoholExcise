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






const enterSold = document.getElementById("incomeVal_c0");
const resultSold = document.getElementById("resultOne");
const btn = document.getElementById("btSend");
const constantValue1 = 37500.00;
const constantValue2 = 77000.00;
const baseAmount1 = 0.014;
const baseAmount2 = 0.027;
const numberOfDaysYear = 365;


btn.addEventListener("click", function () {

    // collect sum date   
    const startDate = document.getElementById("begDate_c0").valueAsDate;
    const endDate = document.getElementById("endDate_c0").valueAsDate;
    const diffInMs = new Date(endDate) - new Date(startDate)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const sumDays = (diffInDays + 1);

    // display start and end date    
    let s = new Date(startDate);
    let e = new Date(endDate);
    let formatter = Intl.DateTimeFormat(
        "default", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );


    if (enterSold.value > constantValue1 && sumDays === numberOfDaysYear) {
        // for the last penny...nana na
        let divisibility = (enterSold.value * parseFloat(baseAmount1) / 3).toFixed(2);
        let twoInstallments = parseFloat(divisibility) + parseFloat(divisibility);
        let globalSumPenny = (enterSold.value * parseFloat(baseAmount1) - parseFloat(twoInstallments)).toFixed(2);


        resultSold.innerHTML = (enterSold.value);

        const resultFinall = document.querySelectorAll(".show-sum-finall");
        for (let i = 0; i < resultFinall.length; i++) {
            resultFinall[i].innerHTML = (enterSold.value * parseFloat(baseAmount1)).toFixed(2);

        }

        const installment = document.querySelectorAll(".installment-one");
        for (let i = 0; i < installment.length; i++) {
            installment[i].innerHTML = ((enterSold.value * parseFloat(baseAmount1)) / 3).toFixed(2);
        }


        const installmentPenny = document.querySelectorAll(".installment-one-penny");
        for (let i = 0; i < installmentPenny.length; i++) {
            installmentPenny[i].innerHTML = (globalSumPenny);
        }

        const dateView = document.querySelector(".info-date");
        dateView.innerHTML = ("od: " + formatter.format(s) + " do " + formatter.format(e));

        const sumResultDaysView = document.querySelector(".sum-days");
        sumResultDaysView.innerHTML = sumDays;



    } else if (enterSold.value < constantValue1 && sumDays === numberOfDaysYear) {
        resultSold.innerHTML = (enterSold.value);

        const resultFinall = document.querySelectorAll(".show-sum-finall");
        const installmentPenny = document.querySelectorAll(".installment-one-penny");
        for (let i = 0; i < resultFinall.length && installmentPenny.length; i++) {
            resultFinall[i].innerHTML = "525,00";
            installmentPenny[i].innerHTML = "175,00";
        }

        const installment = document.querySelectorAll(".installment-one");
        for (let i = 0; i < installment.length; i++) {
            installment[i].innerHTML = "175,00";
        }

        const dateView = document.querySelector(".info-date");
        dateView.innerHTML = ("od: " + formatter.format(s) + " do " + formatter.format(e));

        const sumResultDaysView = document.querySelector(".sum-days");
        sumResultDaysView.innerHTML = sumDays;



    } else if (enterSold.value < constantValue1 && sumDays < numberOfDaysYear) {

        console.log("Mniej niż bazowa, mniej niz 365 dni");


    } else if (enterSold.value > constantValue1 && sumDays < numberOfDaysYear) {
        console.log("Więcej niż bazowa, mniej niz 365 dni");
    }


}, false);