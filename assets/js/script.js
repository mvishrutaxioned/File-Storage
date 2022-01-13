$(document).ready(() => {

    // declaring variables
    let content;
    let edit = [];
    const regexName = /[a-zA-z]/g;
    const regexNum = /[0-9]/g;
    const regexSymbols = /[^a-zA-z0-9]/g;
    let data = JSON.parse(localStorage.getItem('info')) || [];

    // form validation functionality
    function checkName(item) {
        if(item.length == 0) displayError('Above field is required', 'item')
        else if (!regexName.test(item) || regexSymbols.test(item)) displayError('Please enter valid name', 'item')
        else {
            displaySuccess('item')
            return 1
        }
    }

    // form validation functionality
    function checkValue(quantity) {
        if(quantity.length == 0) displayError('Above field is required', 'quantity')
        else if (!regexNum.test(quantity) || regexSymbols.test(quantity)) displayError('Please enter valid value', 'quantity')
        else {
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
        if(edit.length) {
            var obj = {
                id: Math.floor(Math.random() * 10000),
                name,
                value
            }
            data.splice(edit[1], 0, obj);
            localStorage.setItem('info', JSON.stringify(data));
            edit = [];
        } else {
            data.push({
                id: Math.floor(Math.random() * 10000),
                name,
                value
            })
            localStorage.setItem('info', JSON.stringify(data));
        }
        displayData();
    }

    // call displayData function
    displayData()

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
            $('tbody').html('<p class="sorry">No Records Found!</p>');
        }

        // delete button functionality
        $('.remove').each(function(i, elem) {
            $(elem).click((r) => {
                r.preventDefault;

                var myId = $(elem).data('id')
                $(data).each(function(index, value) { if(value.id == myId) data.splice(index, 1) });
                localStorage.setItem('info', JSON.stringify(data));
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
                    localStorage.setItem('info', JSON.stringify(data));

                    edit.push(myId, indexNum);
                    $('#item').val(myData.name);
                    $('#quantity').val(myData.value);
                }
            })
        })
    }

    // clearBtn functionality
    $('#clear').click(e => {
        e.preventDefault;
        data = [];
        localStorage.setItem('info', JSON.stringify(data));
        displayData();
    })

    // addData functionality
    $('#addData').submit((e) => {
        e.preventDefault();

        var item = $('#item').val();
        var quantity = $('#quantity').val();

        let checkNum1 = checkName(item);
        let checkNum2 = checkValue(quantity);

        if (checkNum1 == 1 && checkNum2 == 1) {
            if(edit.length) {
                $(data).each(function(index, value) {
                    if(value.id == edit[0]) data.splice(index, 1)
                });
                localStorage.setItem('info', JSON.stringify(data));
            }
            addData(item, quantity);
            $('#addData').trigger('reset');
        }
    })

})