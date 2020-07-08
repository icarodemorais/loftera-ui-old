var formInstance = $('form').parsley();

var githubPreviousValue = $("#github").val();
var alteracao = 0;
$("#github").keyup(function (e) {
    var currentValue = $(this).val();
    if (currentValue != githubPreviousValue) {
        githubPreviousValue = currentValue;
        alteracao++;
    }
});

var descriptionPreviousValue = $("#github").val();
$("#description").keyup(function (e) {
    var currentValue = $(this).val();
    if (currentValue != descriptionPreviousValue) {
        descriptionPreviousValue = currentValue;
        alteracao++;
    }
});

$('#reply-form').submit(function (e) {

    e.preventDefault();
    if (formInstance.isValid()) {
        if (alteracao > 0) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serializeArray(),
                success: function (retorno) {
                    $("#github").val('');
                    $("#description").val('');
                    alteracao = 0;
                    new Noty({
                        type: 'success',
                        theme: 'nest',
                        text: 'Resposta enviada com sucesso.',
                        timeout: 3500,
                        layout: 'topRight'
                    }).show();
                },
                error: function (error) {
                    if (error.status == 500) {
                        new Noty({
                            type: 'error',
                            theme: 'nest',
                            text: 'Erro ao enviar resposta.',
                            timeout: 3500,
                            layout: 'topRight'
                        }).show();
                    } else {

                        new Noty({
                            type: 'warning',
                            theme: 'nest',
                            text: 'Atenção, alguns campos possuem valores inválidos.',
                            timeout: 3500,
                            layout: 'topRight'
                        }).show();
                        validateError(error);
                    }
                }
            })
        } else {
            new Noty({
                type: 'warning',
                theme: 'nest',
                text: 'Resposta já enviada',
                timeout: 3500,
                layout: 'topRight'
            }).show();
        }
    }
    return false;
});

function validateError(error) {
    var paths = error.responseJSON.paths;
    for (var i in paths) {
        removeCustomErrors();
        var field = $(`#${paths[i]}`).parsley();
        field.addError(`${paths[i]}-already-used`,
            { message: `This ${paths[i]} is already in use. Don't forget, your password is your cpf.` });
    }

}

function removeCustomErrors() {
    var fields = ['email', 'cpf', 'cellPhone'];
    for (var i in fields) {
        var field = $(`#${fields[i]}`).parsley();
        field.removeError(`${fields[i]}-already-used`);

    }
}