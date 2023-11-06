document.addEventListener("DOMContentLoaded", () => {
    let inputMonths = document.getElementById("roimonthrange");
    let resultMoney = document.getElementById("resultMoney");
    let compountMonths = document.querySelectorAll(".compountMonths");
    let inputInvest = document.getElementById("inputInvest");
    let investBaseLabel = document.getElementById("investBaseLabel");
    let inputInvestBase = document.querySelector("#investBase");
    let inputGain = document.getElementById("inputGain");
    let inputGainLabel = document.getElementById("inputGainLabel");
    let errorMessage = document.getElementById("errorMessage");
    calculate();

    function changeBGColorSlider(slider){
        let backgroundColor = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background =
            "linear-gradient(to right, #116e11 0%, #1db01d " +
            backgroundColor +
            "%, #eaeefb " +
            backgroundColor +
            "%, #eaeefb 100%)";
    }
    function calculate() {
        changeBGColorSlider(roimonthrange);
        changeBGColorSlider(inputInvestBase);
        changeBGColorSlider(inputGain);
        // best checks on the world
        if (
            inputInvest.value === null ||
            inputInvest.value === "" ||
            inputInvestBase.value === null ||
            inputInvestBase.value === "" ||
            inputGain.value === null ||
            inputGain.value === "" ||
            inputMonths.value === null ||
            inputMonths.value === ""
        ) {
            errorMessage.innerText = "Please fill all fields";
            setTimeout(function () {
                errorMessage.innerText = "";
            }, 3000);
            return;
        }

        // console.log("inputGain.value: ", inputGain.value);

        // Total value
        resultMoney.innerHTML =
            "$" +
            formula(
                inputInvest.value,
                inputGain.value,
                inputMonths.value,
                inputInvestBase.value
            ).toLocaleString();
        // number of months
        compountMonths.forEach((items) => {
            items.innerHTML = inputMonths.value;
        });
        investBaseLabel.innerHTML = investBase.value;
        inputGainLabel.innerHTML = inputGain.value;
    }

    inputMonths.oninput = function(){
        calculate();
        changeBGColorSlider(this);
    };
    investBase.oninput = function(){
        calculate();
        changeBGColorSlider(this);
    };
    inputGain.oninput = function(){
        calculate();
        changeBGColorSlider(this);
    };

    function formula(invest, gain, time, base) {
        let currentValue = Number(base) || 0;
        for (let i = 1; i < time * 12 + 1; i++) {
            currentValue = Number(currentValue) + Number(invest);
            if (i !== 0 && i % 12 === 0) {
                let interest = (currentValue * Number(gain)) / 100;
                currentValue = currentValue + interest;
                // console.log(
                //     "Compound Value!" +
                //         formatFiat(currentValue) +
                //         " Profits:" +
                //         formatFiat(interest)
                // );
            }
        }
        // console.log("currentValue: ", currentValue);
        return formatFiat(currentValue);
    }

    // Format with 2 decimals method. Thanks @gmajoulet
    function formatFiat(number) {
        return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }

    // ---------------------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------------------------

    // PROFIT SCRIPT
    let profitpercent = 0.15;
    let rangeInput = document.querySelector("#pricerange");
    let capitalValue = document.querySelector("#rangevalue");
    let outputValue = document.querySelector("#outputValue");
    capitalValue.innerHTML = rangeInput.value;
    outputValue.innerHTML = rangeInput.value * profitpercent;
    rangeInput.oninput = function () {
        capitalValue.innerHTML = Number(this.value).toLocaleString();
        outputValue.innerHTML = Number(Math.round((this.value * profitpercent) * 100) / 100).toLocaleString();
        let backgroundColor = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #116e11 0%, #1db01d " +
            backgroundColor +
            "%, #eaeefb " +
            backgroundColor +
            "%, #eaeefb 100%)";
    }
});