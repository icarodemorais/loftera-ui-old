$("input.phonenumber").mask("(00) 90000-0000");
    $("#cpf").mask('000.000.000-00', { reverse: true });
    var formInstance = $('form').parsley();

    window.Parsley
        .addValidator('cpfvalidator', {
            requirementType: 'string',
            validateString: function (value, requirement) {
                value = value.replace(/[^0-9]/g, "");
                return validateCPF(value);
            },
            messages: {
                en: `Invalid cpf.`
            }
        });


    $('#register-form').submit(function () {
        if (formInstance.isValid()) {

            console.log($(this).serializeArray());

            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serializeArray(),
                success: function (retorno) {
                    new Noty({
                        type: 'success',
                        theme: 'nest',
                        text: 'Cadastro realizado com sucesso.',
                        timeout: 3500,
                        layout: 'topRight'
                    }).show();
                    clearRegisterForm();
                },
                error: function (error) {
                    if (error.status == 500) {
                        new Noty({
                            type: 'error',
                            theme: 'nest',
                            text: 'Erro ao realizar cadastro.',
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
        }
        return false;
    });

    function clearRegisterForm() {
        $("#register-form")[0].reset();
        removeCustomErrors();
    }

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};
    
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
    
        return indexed_array;
    }

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

    function validateCPF(cpf) {
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11)
            return false;
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
        }
        else
            return false;
    }