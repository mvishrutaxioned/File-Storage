$(document).ready(() => {

    var data = [
        {
            id: Math.floor(Math.random() * 10000),
            name: "Milk",
            value: 1
        },
        {
            id: Math.floor(Math.random() * 10000),
            name: "Rice",
            value: 1
        },
        {
            id: Math.floor(Math.random() * 10000),
            name: "Bread",
            value: 2
        },
        {
            id: Math.floor(Math.random() * 10000),
            name: "Chocolate",
            value: 20
        }
    ];

    $('#addData').submit((e) => {
        e.preventDefault();

        var item = $('#item').val();
        var quantity = $('#quantity').val();

        if (!item || !quantity) {
            console.log('not ready')
        }
        else if (item && quantity) {
            addData(item, quantity);
        }
    })

})