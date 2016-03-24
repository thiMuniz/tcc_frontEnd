'use strict';
angular.module('sbAdminApp')
        .controller('ClienteCtrl', function ($scope, $position) {
            $scope.titulo = "Cadastro Cliente";
            $scope.headerLista = "Nenhuma cliente foi encontrado";

            $scope.clientes = [
                {cadastro: "000000090909", nome: "ze", sobrenome: "ze", email: "Cat@ Teste", dtNasc: new Date(), tel1: "29372983729387", cep: "92839392", endereco: "rua 1", dtCadastro: new Date()},
                {cadastro: "000000090909", nome: "severion", sobrenome: "ze2", email: "@Cat Teste1", dtNasc: new Date(), tel1: "29372983729387", cep: "92839392", endereco: "rua 3", dtCadastro: new Date()},
                {cadastro: "000000090909", nome: "lula", sobrenome: "ze3", email: "Cat Te@ste2", dtNasc: new Date(), tel1: "29372983729387", cep: "92839392", endereco: "rua 4", dtCadastro: new Date()},
                {cadastro: "000000090909", nome: "dilmes", sobrenome: "z5e", email: "Cat Te@@@ste4", dtNasc: new Date(), tel1: "29372983729387", cep: "92839392", endereco: "rua 6", dtCadastro: new Date()},
                {cadastro: "000000090909", nome: "ta loco", sobrenome: "ze6", email: "Cat Tes@@@te5", dtNasc: new Date(), tel1: "29372983729387", cep: "92839392", endereco: "rua 9", dtCadastro: new Date()}
            ];
            //ainda falta foto, senha, tel2, uf, cidade, bairro, numero , comp
            //depois na hora de exibir , se campo null nao exibir

            var cont = $scope.clientes.length; //contador recebe o numero de resultados da query
//        if(se cont > 0){
            $scope.headerLista = cont + " Clientes encontrados";
//        }   
            //valida email
            $scope.email = function () {
                email.clear();
                email.sendKeys('');
                expect(text.getText()).toEqual('text =');
                expect(valid.getText()).toContain('false');
            };
            //valida data       
            $scope.dtNasc = function () {
                setInput('');
                expect(value.getText()).toEqual('value =');
                expect(valid.getText()).toContain('myForm.input.$valid = false');
            };

            $scope.adicionarCliente = function (cliente) {
                $scope.clientes.push(angular.copy(cliente));
                delete $scope.cliente;
                $scope.formCadastroUser.$setPristine();
            };
            $scope.apagarClientes = function (clientes) {
                $scope.clientes = clientes.filter(function (cliente) {
                    if (!cliente.selecionado)
                        return cliente;
                });
            };
            $scope.ordenarPor = function (campo) {
                $scope.criterioDeOrdenacao = campo;
                $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
            };


            $scope.openDialog = function (clickEvent, cli) {
                var acao = clickEvent.currentTarget.getAttribute("data-id");

                switch (acao) {
                    case 'inserirPf':
                        $scope.iconeFormModal = "add_circle_outline";
                        $scope.tituloModal = "Cadastrar Cliente PF";
                        $scope.cliente = {cadastro: "", nome: "", email: "", tel1: "", cep: "", endereco: "", senha: ""};
                        break;

                    case 'inserirPj':
                        $scope.iconeFormModal = "add_circle_outline";
                        $scope.tituloModal = "Cadastrar Cliente PJ";
                        $scope.cliente = {cadastro: "", nome: "", email: "", tel1: "", cep: "", endereco: "", senha: ""};
                        break;

                    case 'editar':
                        $scope.iconeFormModal = "edit";
                        $scope.tituloModal = "Editar Cliente";
                        $scope.cliente = cli;
                        break;

                    case 'desativar':
                        swal({
                            title: "Deseja mesmo desativar o Cliente " + cli.nome + "?",
                            text: "Você poderá ativar o cliente novanente!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            cancelButtonText: "Não, me tire daqui!",
                            confirmButtonText: "Sim, quero desativar!",
                            closeOnConfirm: false},
                                function () {
                                    //metodo deleteCacliente - passa o cliente por parâmetro para exclusão

                                    swal({
                                        title: "Cliente desativado!",
                                        type: "success"
                                    });
                                });
                        break;

                    case 'info':
                        $scope.tituloModal = "Detalhes Cliente";
                        $scope.cliente = cli;
                        break;

                    default:
                        //mostrar alerta na tela de ação desconhecida
                        break;
                }
            }

//                controla abas do formulario
            $scope.steps = [
                'Dados Pessoais',
                'Dados Contato',
                'Dados Localização'
            ];
            $scope.selection = $scope.steps[0];//esse indice que diz se sera comecar qual aba
            $scope.getCurrentStepIndex = function () {
                // Get the index of the current step given selection
                return _.indexOf($scope.steps, $scope.selection);
            };
            // Go to a defined step index
            $scope.goToStep = function (index) {
                if (!_.isUndefined($scope.steps[index]))
                {
                    $scope.selection = $scope.steps[index];
                }
            };
            $scope.hasNextStep = function () {
                var stepIndex = $scope.getCurrentStepIndex();
                var nextStep = stepIndex + 1;
                // Return true if there is a next step, false if not
                return !_.isUndefined($scope.steps[nextStep]);
            };
            $scope.hasPreviousStep = function () {
                var stepIndex = $scope.getCurrentStepIndex();
                var previousStep = stepIndex - 1;
                // Return true if there is a next step, false if not
                return !_.isUndefined($scope.steps[previousStep]);
            };
            $scope.incrementStep = function () {
                if ($scope.hasNextStep())
                {
                    var stepIndex = $scope.getCurrentStepIndex();
                    var nextStep = stepIndex + 1;
                    $scope.selection = $scope.steps[nextStep];
                }
            };
            $scope.decrementStep = function () {
                if ($scope.hasPreviousStep())
                {
                    var stepIndex = $scope.getCurrentStepIndex();
                    var previousStep = stepIndex - 1;
                    $scope.selection = $scope.steps[previousStep];
                }
            }
//                        fim da parde de controle de abas

        });
