$(document).ready(() => {

    // declaring variables
    let content;
    let edit = [];
    const regexName = /[^a-zA-z]/g;
    const regexNum = /[^0-9]/g;

    let data = JSON.parse(localStorage.getItem('info')) || [];

    // call displayData function
    displayData()

    // form validation functionality
    function checkName() {
        var item = $('#item').val();
        if(item.length == 0) {
            displayError('Above field is required', 'item')
        } else if (regexName.test(item)) {
            displayError('Please enter valid name', 'item')
        } else {
            displaySuccess('item')
            return 1
        }
    }

    // form validation functionality
    function checkValue() {
        var quantity = $('#quantity').val();
        if(quantity.length == 0) {
            displayError('Above field is required', 'quantity')
        } else if (regexNum.test(quantity)) {
            displayError('Please enter valid value', 'quantity')
        } else {
            displaySuccess('quantity')
            return 1
        }
    }

    // display error function
    function displayError(msg, e) {
        $(`.${e}Err`).text(msg)
        $(`.${e}Err`).show()
    }

    // display success function
    function displaySuccess(e) {
        $(`.${e}Err`).html('')
        $(`.${e}Err`).hide()
    }

    // checkName on input blur
    $('#item').blur((e) => {
        var item = $('#item').val();
        checkName(item)
    });

    // checkValue on input blur
    $('#quantity').blur((e) => {
        var quantity = $('#quantity').val();
        checkValue(quantity)
    });

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

        // modify button functionality
        $('.modify').each(function(i, elem) {
            $(elem).click(r => {
                r.preventDefault();

                if(edit.length == 0) {
                    var indexNum;
                    var myId = $(elem).data('id');
                    myData = data.find(e => e.id === myId)
                    $(data).each((index, el) => (el.id == myId ? indexNum = index : ''))

                    edit.push(myId, indexNum);
                    $('#item').val(myData.name);
                    $('#quantity').val(myData.value);
                }
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