const dtNow = new Date();

let delayTimer;

function input(ele) {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
        ele.value = parseFloat(ele.value).toFixed(2).toString();
    }, 800);
}


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
    const cb = document.getElementById('cb_c' + n);
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
const baseAmount1zl = 525.00;
const baseAmount2 = 0.027;
const baseAmount2zl = 2100.00;
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
        //console.log("more 37500.00 equal to 365 days");

        // for the last penny...
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
        //console.log("less 37500.00 equal to 365 days");
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
        //console.log("less 37500.00 less 365 days");
        resultSold.innerHTML = (enterSold.value);
        const resultFinall = document.querySelectorAll(".show-sum-finall");
        const calculate = baseAmount1zl / numberOfDaysYear;
        const calculateFinal = (calculate * parseFloat(sumDays)).toFixed(2);

        for (let i = 0; i < resultFinall.length; i++) {
            resultFinall[i].innerHTML = calculateFinal;
        }

        const installment = document.querySelectorAll(".installment-one");
        for (let i = 0; i < resultFinall.length; i++) {
            installment[0].innerHTML = calculateFinal;
            installment[1].innerHTML = '0,00';
            installment[2].innerHTML = calculateFinal;
            installment[3].innerHTML = '0,00';
        }

        const installmentPenny = document.querySelectorAll(".installment-one-penny");
        for (let i = 0; i < installmentPenny.length; i++) {
            installmentPenny[i].innerHTML = '0,00';
        }

        const dateView = document.querySelector(".info-date");
        dateView.innerHTML = ("od: " + formatter.format(s) + " do " + formatter.format(e));

        const sumResultDaysView = document.querySelector(".sum-days");
        sumResultDaysView.innerHTML = sumDays;


    } else if (enterSold.value > constantValue1 && sumDays < numberOfDaysYear) {
        //console.log("more 37500.00 less 365 days");
        resultSold.innerHTML = (enterSold.value);
        let calculator = (enterSold.value * parseFloat(baseAmount1)).toFixed(2)
        let calculateFinall = (calculator / numberOfDaysYear * parseFloat(sumDays)).toFixed(2);

        const resultFinall = document.querySelectorAll(".show-sum-finall")
        for (let i = 0; i < resultFinall.length; i++) {
            resultFinall[i].innerHTML = calculateFinall;
        }

        const installment = document.querySelectorAll(".installment-one");
        for (let i = 0; i < installment.length; i++) {
            installment[0].innerHTML = calculateFinall;
            installment[1].innerHTML = '0,00';
            installment[2].innerHTML = calculateFinall;
            installment[3].innerHTML = '0,00';
        }

        const installmentPenny = document.querySelectorAll(".installment-one-penny");
        for (let i = 0; i < installmentPenny.length; i++) {
            installmentPenny[i].innerHTML = '0,00';
        }

        const dateView = document.querySelector(".info-date");
        dateView.innerHTML = ("od: " + formatter.format(s) + " do " + formatter.format(e));

        const sumResultDaysView = document.querySelector(".sum-days");
        sumResultDaysView.innerHTML = sumDays;
    }
}, false);