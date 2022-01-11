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

    // call displayData function
    displayData()

    // addData functionality
    function addData(name, value) {
        data.push({
            id: Math.floor(Math.random() * 10000),
            name,
            value
        })
        displayData();
    }

    // displayData function
    function displayData() {
        $('tbody').html('')
        content = '';

        if(data.length) {
            for (var i of data) {
                content += `
                <tr>
                    <td>${i.name}</td>
                    <td>${i.value}</td>
                    <td><a href="#FIXME" title="Modify" class="modify" data-id="${i.id}">Edit</a></td>
                    <td><a href="#FIXME" title="Remove" class="remove" data-id="${i.id}">Del</a></td>
                </tr>
                `;
            }
            $('tbody').html(content);
        } else {
            $('.sorry').show();
            console.log('sorry')
        }

        // delete button functionality
        $('.remove').each(function(i, elem) {
            $(elem).click((r) => {
                r.preventDefault;

                var myId = $(elem).data('id')
                $(data).each(function(index, value) { if(value.id == myId) data.splice(index, 1) });
                displayData();
            })
        })
    }

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