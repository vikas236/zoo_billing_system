// Calling elements
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");
const total = document.querySelector(".total");
const types = ["A Adult", "C Child", "M Car", "K Video Camera", "F Family(B Van)", "T B. Van Adult", "H B. Van Child", "E - Bicycle", "R Foreigner (A)", "C Foreigner (C)"];
const rate = [70, 30, 750, 50, 100, 100, 100, 100, 100, 100];
const ticket = document.querySelector(".show_ticket");
const final_table = document.querySelector(".final_table");
const f_tbody = document.querySelector(".f_tbody");
const f_total = document.querySelector(".f_total")
const print = document.querySelector(".print");
const reset = document.querySelector(".reset");
const date_display = document.querySelector(".date");
const date = new Date();
const time_display = document.querySelector(".time");
const time = new Date();
const tnum = document.querySelectorAll(".tnum");
let ticket_num = 0;
let i = 2;



// Load few elements
const date_time = () => {
    date_display.innerHTML = `Date: ${date.getDate()}/${date.getMonth()}/${(date.getUTCFullYear()) % 100}`
    time_display.innerHTML = `Time&emsp;&emsp;: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}
date_time();


// Functions
const create_table = () => {
    for (let i = 0; i < 10; i++) {
        let row = tbody.insertRow(i);
        if (i == 0) { row.classList.add("active"); }
        for (let j = 0; j < 4; j++) {
            let cell = row.insertCell(j);
            if (j == 0) {
                cell.innerHTML = types[i];
                cell.classList.add("ticket_type");
            }
            else if (j == 1) {
                cell.innerHTML = 0;
                cell.classList.add("quantity");
            }
            else if (j == 2) {
                cell.innerHTML = rate[i];
                cell.classList.add("rate");
            }
            else if (j == 3) {
                cell.classList.add("amount");
            }
        }
    }
    const tr = (table.childNodes[1]).childNodes;
    return tr;
}
create_table();

const update_qrdata = () => {
    let data = "ticket no: 0\n";
    for (let i = 0; i < f_tbody.childNodes.length; i++) {
        let row = f_tbody.childNodes[i];
        data += "\n";
        for (let i = 0; i < 4; i++) {
            // if (i == 0) { data += (row.childNodes[i].innerHTML).substr(0, 1) + " "}
            data += row.childNodes[i].innerHTML + " ";
        }
    }
    return data;
}

let qrcode = new QRCode(document.querySelector(".qrcode"), {
    text: "hello, there",
    width: 200,
    height: 200
});
qrcode.makeCode(update_qrdata());

const add_ticket = () => {
    let j = 0;
    f_tbody.innerHTML = "";
    for (let i = 0; i < tbody.childNodes.length; i++) {
        const data = tbody.childNodes[i];
        if (data.childNodes[1].innerHTML != 0) {
            let row = f_tbody.insertRow(j++);
            row.innerHTML = data.innerHTML;
        }
    }
}

const update_total = () => {
    let total_cost = 0;
    for (let i = 0; i < tbody.childNodes.length; i++) {
        let amount = parseInt(((tbody.childNodes[i]).childNodes[3]).innerHTML);
        if (amount) { total_cost += amount }
    }
    total.innerHTML = `${total_cost}/-`;
    f_total.innerHTML = `Total:&emsp;${total_cost}/-`;
    add_ticket();
    qrcode.makeCode(update_qrdata());
}

const update_amount = () => {
    let active = document.querySelector(".active");
    const rate = parseInt(active.childNodes[2].innerHTML);
    if (rate) {
        const quantity = parseInt(active.childNodes[1].innerHTML);
        active.childNodes[3].innerHTML = rate * quantity;
    }
    update_total();
}
update_amount();

const update_ticket_num = () => {
    tnum[0].innerHTML = ticket_num;
    tnum[1].innerHTML = `Ticket No: ${ticket_num}`;
    ticket_num++;
}

const print_ticket = () => {
    window.print();
    update_ticket_num();
}

const erase = () => {
    tbody.innerHTML = "";
    create_table();
    f_tbody.innerHTML = "";
    total.innerHTML = `0/-`;
    f_total.innerHTML = `Total:&emsp;0/-`;
}



// Calling functions for events
document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowDown') {
        let active = document.querySelector(".active");
        let next = (active.nextElementSibling);
        if (next) {
            active.classList.remove("active");
            next.classList.add("active");
        }
    }
})

document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowUp') {
        let active = document.querySelector(".active");
        let previous = (active.previousElementSibling);
        if (previous) {
            active.classList.remove("active");
            previous.classList.add("active");
        }
    }
})

document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowLeft') {
        let active = document.querySelector(".active");
        const quantity = active.childNodes[1];
        if (!parseInt(quantity.innerHTML) <= 0) {
            quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
            update_amount();
        }
    }
})


document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowRight') {
        let active = document.querySelector(".active");
        const quantity = active.childNodes[1];
        quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
        update_amount();
    }
})

print.addEventListener("click", function () {
    if (total.innerHTML != "0/-") {
        print_ticket();
    };
});
reset.addEventListener("click", erase);